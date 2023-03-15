package main

import (
	"github.com/pnnh/multiverse-cloud-server/server"
	"github.com/pnnh/multiverse-cloud-server/server/auth/authorizationserver" 
	"github.com/sirupsen/logrus"
)

func main() { 
	server.InitWebauthn()
	authorizationserver.InitOAuth2()
	app := NewApplication()

	if err := app.Init(); err != nil {
		logrus.Fatalln("应用程序初始化出错: %w", err)
	}
	if err := app.Start(); err != nil {
		logrus.Fatalln("应用程序执行出错: %w", err)
	}
}
