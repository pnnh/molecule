package main

import (
	"context"
	"fmt"
	"log"
	"net"

	"example_module/protoz"
	"google.golang.org/grpc"
)

type Server struct {
}

func (s *Server) Add(ctx context.Context, in *foo.AddIn) (*foo.AddOut, error) {
	return &foo.AddOut{}, nil
}

func Start(addr string, port int) error {
	lis, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%d", port))
	if err != nil {
		log.Println("main", "failed to listen22: %v", err)
		return nil
	}
	serv := &Server{}
	grpcServer := grpc.NewServer()
	foo.RegisterServiceServer(grpcServer, serv)
	if err = grpcServer.Serve(lis); err != nil {
		log.Println("服务停止", err)
	}
	return err
}
