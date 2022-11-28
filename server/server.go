package server

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"quantum/config"
	"quantum/server/auth"
	"quantum/server/handlers"
	"quantum/server/handlers/pages"
	"quantum/server/handlers/resources"
	"quantum/server/middleware"
	"quantum/server/utils"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

type WebServer struct {
	router     *gin.Engine
	middleware *middleware.ServerMiddleware
	resources  map[string]resources.IResource
}

func NewWebServer(smw *middleware.ServerMiddleware) (*WebServer, error) {
	router := gin.Default()

	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	server := &WebServer{
		router:     router,
		middleware: smw,
		resources:  make(map[string]resources.IResource)}
	router.SetFuncMap(utils.FuncMap())
	router.LoadHTMLGlob("browser/templates/**/*.mst")

	router.Use(cors.New(cors.Config{
		//AllowOrigins:     corsDomain,
		AllowOriginFunc: func(origin string) bool {
			if config.Debug() {
				return true
			} else if strings.HasSuffix(origin, ".sfx.xyz") {
				return true
			}
			return false
		},
		AllowMethods:     []string{"PUT", "PATCH", "POST", "GET"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	//router.NoRoute(handlers.ClientPage)
	//router.NoRoute(debugStaticWebHandler)
	router.NoRoute(staticWebHandler)

	router.Static("fonts", "browser/fonts")
	router.Static("images", "browser/images")
	router.Static("scripts", "browser/scripts/dist")

	if config.Debug() {
		router.Static("files", "files")
	}
	store := cookie.NewStore([]byte("secret"))
	router.Use(sessions.Sessions("mysession", store))

	return server, nil
}

func (s *WebServer) Init() error {
	indexHandler := pages.NewIndexHandler(s.middleware)
	s.router.GET("/", indexHandler.Query)
	//indexRestfulHandler := restful.NewIndexRestfulHandler(s.middleware)
	resourcesHandler := handlers.NewResourcesHandler(s.middleware)
	//s.router.POST("/restful/index", indexRestfulHandler.Query)
	s.router.POST("/restful/resources/query", resourcesHandler.Query)
	s.router.POST("/restful/resources/find", resourcesHandler.Find)
	sitemapHandler := handlers.NewSitemapHandler(s.middleware)
	s.router.GET("/seo/sitemap", sitemapHandler.HandleSitemap)
	s.router.GET("/utils/random/password", handlers.HandleRandomPassword)
	s.router.GET("/utils/encrypt/md5", handlers.HandleCalcMd5)
	s.router.GET("/utils/timestamp", handlers.HandleTimestamp)

	s.router.GET("/register/begin/:username", BeginRegistration)
	s.router.POST("/register/finish/:username", FinishRegistration)
	s.router.GET("/login/begin/:username", BeginLogin)
	s.router.POST("/login/finish/:username", FinishLogin)

	s.resources["post"] = resources.NewArticleResource(s.middleware)
	s.resources["account"] = resources.NewAccountResource(s.middleware)
	s.resources["user"] = resources.NewUserResource(s.middleware)

	for name, resource := range s.resources {
		resource.RegisterRouter(s.router, name)
	}
	auth.InitOAuth2(s.router)

	return nil
}

func (s *WebServer) Start() error {
	port := os.Getenv("PORT")
	if len(port) < 1 {
		port = "8080"
	}
	var handler http.Handler = s

	if config.Release() {
		handler = Minify(s)
	}

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
