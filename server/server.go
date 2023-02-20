package server

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/pnnh/multiverse-cloud-server/server/auth/authorizationserver" 
	"github.com/pnnh/multiverse-cloud-server/server/handlers"
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

	authHandler := &webauthnHandler{}
	s.router.GET("/server/register/begin/:username", authHandler.BeginRegistration)
	s.router.POST("/server/register/finish/:username", authHandler.FinishRegistration)
	s.router.GET("/server/login/begin/:username", authHandler.BeginLogin)
	s.router.POST("/server/login/finish/:username", authHandler.FinishLogin)

	s.router.GET("/server/oauth2/auth", func(gctx *gin.Context) {
		authorizationserver.AuthEndpointHtml(gctx)
	})
	s.router.POST("/server/oauth2/auth", func(gctx *gin.Context) {
		authorizationserver.AuthEndpointJson(gctx)
	})
 
	s.router.POST("/server/oauth2/token", func(gctx *gin.Context) {
		authorizationserver.TokenEndpoint(gctx.Writer, gctx.Request)
	})
	s.router.POST("/server/oauth2/revoke", func(gctx *gin.Context) {
		authorizationserver.RevokeEndpoint(gctx)
	})
	s.router.POST("/server/oauth2/introspect", func(gctx *gin.Context) {
		authorizationserver.IntrospectionEndpoint(gctx)
	}) 

	return nil
}

func (s *WebServer) Start() error {
	port := os.Getenv("port")
	if len(port) < 1 {
		port = "8080"
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
	//if config.Debug() && strings.HasPrefix(r.URL.Path, "/blog/") {
	//	devBlogHandler(w, r)
	//	return
	//}
	s.router.ServeHTTP(w, r)
}
