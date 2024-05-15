package main

import (
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"

	"pb"

	"context"
)

type sessionServer struct {
}

func (s *sessionServer) Ping(ctx context.Context, request *pb.Message) (*pb.Message, error) {
	return &pb.Message{Content: request.Content + " reply"}, nil
}

func newServer() *sessionServer {
	s := &sessionServer{}
	return s
}

func startServer(port int) {

	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	var opts []grpc.ServerOption
	grpcServer := grpc.NewServer(opts...)
	pb.RegisterSessionServer(grpcServer, newServer())
	grpcServer.Serve(lis)
}
