package main

import (
	"fmt"
	"sync"

	"github.com/pnnh/multiverse-cloud-server/server"
	"github.com/pnnh/quantum-go/config"
	"github.com/pnnh/quantum-go/services/sqlxsvc"

	"github.com/gin-gonic/gin"

	"github.com/sirupsen/logrus"
)

type IService interface {
	Init() error
	Start() error
}

type Application struct {
	services map[string]IService
}

func NewApplication() *Application {
	app := &Application{services: make(map[string]IService)}

	return app
}

func (app *Application) Use(key string, serv IService) {
	app.services[key] = serv
}

func (app *Application) Init() error {
	accountDSN, ok := config.GetConfiguration("ACCOUNT_DB")
	if !ok || accountDSN == nil {
		return fmt.Errorf("ACCOUNT_DB未配置")
	}

	if err := sqlxsvc.Init(accountDSN.(string)); err != nil {
		logrus.Fatalln("sqlxsvc: ", err)
	}
	//gin.SetMode(gin.ReleaseMode)
	if config.Debug() {
		gin.SetMode(gin.DebugMode)
		logrus.SetLevel(logrus.DebugLevel)
	}

	webServer, err := server.NewWebServer()
	if err != nil {
		return fmt.Errorf("创建web server出错: %w", err)
	}
	app.Use("server", webServer)
	return nil
}

func (app *Application) Start() error {
	wg := sync.WaitGroup{}
	for k, v := range app.services {
		if err := v.Init(); err != nil {
			return fmt.Errorf("初始化服务出错: %s %w", k, err)
		}
		wg.Add(1)
		go func(serv IService) {
			defer wg.Done()
			if err := serv.Start(); err != nil {
				logrus.Fatalln("服务运行出错: %w", err)
			}
		}(v)
	}
	wg.Wait()
	return nil
}
