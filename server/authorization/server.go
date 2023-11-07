package main

import (
	"fmt"
	"net/http"
	"os"
	"time"

	handlers "github.com/pnnh/multiverse-cloud-server/handlers"
	"github.com/pnnh/multiverse-cloud-server/handlers/account"
	"github.com/pnnh/multiverse-cloud-server/handlers/applications"
	"github.com/pnnh/multiverse-cloud-server/handlers/auth/authorizationserver"
	"github.com/pnnh/multiverse-cloud-server/handlers/captcha"
	"github.com/pnnh/multiverse-cloud-server/handlers/permissions"
	"github.com/pnnh/multiverse-cloud-server/handlers/roles"
	"github.com/pnnh/multiverse-cloud-server/handlers/users"
	"github.com/pnnh/multiverse-cloud-server/helpers"

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

	corsDomain := []string{"https://portal.huable.com"}

	if config.Debug() {
		corsDomain = append(corsDomain, "https://portal.huable.xyz")
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
	s.router.GET(helpers.BaseUrl + "/", indexHandler.Query)

	authHandler := &handlers.WebauthnHandler{}
	s.router.POST(helpers.BaseUrl + "/account/signup/webauthn/begin/:username", authHandler.BeginRegistration)
	s.router.POST(helpers.BaseUrl + "/account/signup/webauthn/finish/:username", authHandler.FinishRegistration)
	s.router.POST(helpers.BaseUrl + "/account/signin/webauthn/begin/:username", authHandler.BeginLogin)
	s.router.POST(helpers.BaseUrl + "/account/signin/webauthn/finish/:username", authHandler.FinishLogin)

	// s.router.POST("/account/signup/email/begin", account.MailSignupBeginHandler)
	// s.router.POST("/account/signup/email/finish", account.MailSignupFinishHandler)
	// s.router.POST("/account/signin/email/begin", account.MailSigninBeginHandler)
	// s.router.POST("/account/signin/email/finish", account.MailSigninFinishHandler)

	//s.router.POST("/account/signup/password/begin", account.PasswordSignupBeginHandler)
	s.router.POST(helpers.BaseUrl + "/account/signup/password/finish", account.PasswordSignupFinishHandler)
	//s.router.POST("/account/signin/password/begin", account.PasswordSigninBeginHandler)
	s.router.POST(helpers.BaseUrl + "/account/signin/password/finish", account.PasswordSigninFinishHandler)

	s.router.GET(helpers.BaseUrl + "/users/select", users.UserSelectHandler)
	s.router.GET(helpers.BaseUrl + "/users/get", users.UserGetHandler)

	s.router.GET(helpers.BaseUrl + "/applications/select", applications.ApplicationSelectHandler)

	s.router.GET(helpers.BaseUrl + "/roles/select", roles.RoleSelectHandler)
	s.router.GET(helpers.BaseUrl + "/roles/get", roles.RoleGetHandler)

	s.router.GET(helpers.BaseUrl + "/permissions/select", permissions.PermissionSelectHandler)

	// sessionHandler := &handlers.SessionHandler{}
	// s.router.POST("/account/session/introspect", sessionHandler.Introspect)

	s.router.GET(helpers.BaseUrl + "/oauth2/auth", func(gctx *gin.Context) {
		authorizationserver.AuthEndpointHtml(gctx)
	})
	s.router.POST(helpers.BaseUrl + "/oauth2/auth", func(gctx *gin.Context) {
		authorizationserver.AuthEndpointJson(gctx)
	})

	s.router.POST(helpers.BaseUrl + "/oauth2/token", authorizationserver.TokenEndpoint)
	s.router.POST(helpers.BaseUrl + "/oauth2/revoke", func(gctx *gin.Context) {
		authorizationserver.RevokeEndpoint(gctx)
	})
	s.router.POST(helpers.BaseUrl + "/oauth2/introspect", func(gctx *gin.Context) {
		authorizationserver.IntrospectionEndpoint(gctx)
	})
	s.router.GET(helpers.BaseUrl + "/oauth2/jwks", func(gctx *gin.Context) {
		authorizationserver.JwksEndpoint(gctx)
	})
	s.router.POST(helpers.BaseUrl + "/oauth2/user", func(gctx *gin.Context) {
		authorizationserver.UserEndpoint(gctx)
	})

	s.router.GET(helpers.BaseUrl + "/.well-known/openid-configuration", authorizationserver.OpenIdConfigurationHandler)

	s.router.GET(helpers.BaseUrl + "/api/go_captcha_data", captcha.GetCaptchaData)
	s.router.POST(helpers.BaseUrl + "/api/go_captcha_check_data", captcha.CheckCaptcha)

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
