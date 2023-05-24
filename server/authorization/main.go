package main

import (
	"github.com/gin-gonic/gin"
	"github.com/pnnh/multiverse-cloud-server/handlers"
	"github.com/pnnh/multiverse-cloud-server/handlers/auth/authorizationserver"
	"github.com/pnnh/quantum-go/config"
	"github.com/pnnh/quantum-go/services/datastore"
	"github.com/sirupsen/logrus"
)

func main() {

	if config.Debug() {
		gin.SetMode(gin.DebugMode)
		logrus.SetLevel(logrus.DebugLevel)
	}

	handlers.InitWebauthn()
	authorizationserver.InitOAuth2()

	accountDSN, ok := config.GetConfiguration("ACCOUNT_DB")
	if !ok || accountDSN == nil {
		logrus.Errorln("ACCOUNT_DB未配置")
	}

	if err := datastore.Init(accountDSN.(string)); err != nil {
		logrus.Fatalln("datastore: ", err)
	}

	webServer, err := NewWebServer()
	if err != nil {
		logrus.Fatalln("创建web server出错", err)
	}

	if err := webServer.Start(); err != nil {
		logrus.Fatalln("应用程序执行出错: %w", err)
	}
}
