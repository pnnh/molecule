package main

import (
	"flag"
	"fmt"
	"google.golang.org/grpc"
	"log"
	"net"
	"suji"
	"suji/server"
)

var (
	flagPort        int
)

func init() {
	flag.IntVar(&flagPort, "port", 1301, "监听端口")
}

func main() {
	flag.Parse()

	lis, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%d", flagPort))
	if err != nil {
		log.Fatalln("监听出错", err)
		return
	}

	grpcServer := grpc.NewServer()
	suji.RegisterSujiServer(grpcServer, &server.SujiServer{})

	//log.Println("开始对话")
	if err = grpcServer.Serve(lis); err != nil {
		log.Fatalln("服务停止", err)
	}
}
