package main

import (
	"fmt"
	handlers "github.com/pnnh/multiverse-cloud-server/handlers"
	"github.com/pnnh/multiverse-cloud-server/handlers/account"
	"github.com/pnnh/multiverse-cloud-server/handlers/auth"
	"github.com/pnnh/multiverse-cloud-server/handlers/auth/authorizationserver"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/pnnh/quantum-go/config"

	"github.com/gin-gonic/gin"
)

type IResource interface {
	RegisterRouter(router *gin.Engine, name string)
}

type WebServer struct {
	router    *gin.Engine
	resources map[string]IResource
}

func NewWebServer() (*WebServer, error) {
	router := gin.Default()

	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	server := &WebServer{
		router:    router,
		resources: make(map[string]IResource)}

	corsDomain := []string{"https://multiverse.direct", "https://www.multiverse.direct"}

	if config.Debug() {
		corsDomain = append(corsDomain, "http://127.0.0.1:3500")
		corsDomain = append(corsDomain, "https://debug.multiverse.direct")
	}

	router.Use(cors.New(cors.Config{
		AllowOrigins:     corsDomain,
		AllowMethods:     []string{"PUT", "PATCH", "POST", "GET"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	return server, nil
}

func (s *WebServer) Init() error {
	indexHandler := handlers.NewIndexHandler()
	s.router.GET("/", indexHandler.Query)

	authHandler := &handlers.WebauthnHandler{}
	s.router.POST("/register/begin/:username", authHandler.BeginRegistration)
	s.router.POST("/register/finish/:username", authHandler.FinishRegistration)
	s.router.POST("/login/begin/:username", authHandler.BeginLogin)
	s.router.POST("/login/finish/:username", authHandler.FinishLogin)

	sessionHandler := &handlers.SessionHandler{}
	s.router.POST("/session/introspect", sessionHandler.Introspect)

	s.router.POST("/account/signup/email/begin", account.MailSignupBeginHandler)
	s.router.POST("/account/signup/email/finish", account.MailSignupFinishHandler)
	s.router.POST("/account/signin/email/begin", account.MailSigninBeginHandler)
	s.router.POST("/account/signin/email/finish", account.MailSigninFinishHandler)

	s.router.GET("/oauth2/auth", func(gctx *gin.Context) {
		authorizationserver.AuthEndpointHtml(gctx)
	})
	s.router.POST("/oauth2/auth", func(gctx *gin.Context) {
		authorizationserver.AuthEndpointJson(gctx)
	})

	s.router.POST("/oauth2/token", authorizationserver.TokenEndpoint)
	s.router.POST("/oauth2/revoke", func(gctx *gin.Context) {
		authorizationserver.RevokeEndpoint(gctx)
	})
	s.router.POST("/oauth2/introspect", func(gctx *gin.Context) {
		authorizationserver.IntrospectionEndpoint(gctx)
	})

	s.router.GET("/.well-known/openid-configuration", auth.OpenIdConfigurationHandler)

	return nil
}

func (s *WebServer) Start() error {
	if err := s.Init(); err != nil {
		return fmt.Errorf("初始化出错: %w", err)
	}
	port := os.Getenv("port")
	if len(port) < 1 {
		port = "8001"
	}
	var handler http.Handler = s

	serv := &http.Server{
		Addr:           ":" + port,
		Handler:        handler,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	if err := serv.ListenAndServe(); err != nil {
		return fmt.Errorf("服务出错停止: %w", err)
	}
	return nil
}

func (s *WebServer) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.router.ServeHTTP(w, r)
}
