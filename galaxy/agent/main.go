package main

import (
	"galaxy-agent/helpers"

	"github.com/sirupsen/logrus"
)

func main() {
	helpers.MustLoadConfig()

	webServer, err := NewWebServer()
	if err != nil {
		logrus.Fatalln("创建web server出错", err)
	}

	if err := webServer.Start(); err != nil {
		logrus.Fatalln("应用程序执行出错: %w", err)
	}
}
