package main

import (
	"fmt"
 "log"

	"socketdeadline/socket"
)

func main() {

	serviceImpl, err := socket.Listen(fmt.Sprintf("0.0.0.0:6677") )
	if err != nil {
		log.Fatal("监听出错", err)
		return
	}
	if err := serviceImpl.Serve(); err != nil {
		log.Fatalln("http 服务执行出错 %w", err)
		return
	}
}
