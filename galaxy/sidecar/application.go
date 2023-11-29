package main

import (
	"fmt"
	"galaxy-sidecar/server/handlers"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/sirupsen/logrus"
)

type Application struct {
	router *gin.Engine
}

func NewApplication() *Application {
	router := gin.Default()

	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	app := &Application{
		router: router,
	}
	return app
}

func (app *Application) Init() error {
	if config.Debug() {
		gin.SetMode(gin.DebugMode)
		logrus.SetLevel(logrus.DebugLevel)
	}
	indexHandler := handlers.NewIndexHandler()
	app.router.GET("/", indexHandler.Query)
	return nil
}

func (app *Application) Start() error {
	port := os.Getenv("port")
	if len(port) < 1 {
		port = "8402"
	}
	var handler http.Handler = app

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

func (app *Application) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	app.router.ServeHTTP(w, r)
}
