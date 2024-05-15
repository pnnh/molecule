package main

import (
	"pb"
	"sync"

	"log"

	"google.golang.org/grpc"
)

type sessionClient struct {
	Ch     chan *pb.Message
	mu     sync.Mutex
	Client pb.SessionClient
}

func newSessionClient() *sessionClient {
	return &sessionClient{
		Ch: make(chan *pb.Message),
	}
}

func (c *sessionClient) Dial(ip string) error {
	log.Println("会话服务器Connect")
	var err error
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithInsecure())
	conn, err := grpc.Dial(ip, opts...)
	if err != nil {
		return err
	}
	log.Println("会话服务器Connect 2")
	c.Client = pb.NewSessionClient(conn)
	return nil
}
