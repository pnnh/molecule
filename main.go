package main

import (  
	"github.com/pnnh/multiverse-server/config"
	"github.com/pnnh/multiverse-server/server/auth/authorizationserver"
	"github.com/sirupsen/logrus" 
)

func main() {
	config.InitApp()

	authorizationserver.InitOAuth2()

	app := NewApplication()

	if err := app.Init(); err != nil {
		logrus.Fatalln("应用程序初始化出错: %w", err)
	}
	if err := app.Start(); err != nil {
		logrus.Fatalln("应用程序执行出错: %w", err)
	}
}
