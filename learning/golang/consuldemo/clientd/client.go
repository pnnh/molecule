package main

import (
	"context"
	"log"

	"google.golang.org/grpc"

	"consuldemo/pb"
)

func Connect() {

	conn, err := grpc.DialContext(context.Background(), "localhost:8899",
		grpc.WithInsecure(),  )
	if err != nil {
		log.Fatalln("会话服务Dial出错 %s", err)
	}
	client := pb.NewSessionClient(conn)

	in := &pb.MsgAddIn{From: "aa"}
	out, err :=  client.MsgAdd(context.TODO(), in)
	log.Println("jjjj", out, err)
}
