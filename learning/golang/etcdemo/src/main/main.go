package main

import (
	"context"
	"log"
	"time"

	"pb"

	"github.com/coreos/etcd/clientv3"
)

func main() {
	cli, err := clientv3.New(clientv3.Config{
		Endpoints:   []string{"gentoo:2379"},
		DialTimeout: 5 * time.Second,
	})
	if err != nil {
		// handle error!
		log.Println("xxxxxx", err)
	}
	defer cli.Close()

	cli.Put(context.Background(), "key1/subkey1", "subval1")
	rep, err := cli.Get(context.Background(), "key1/subkey1")
	log.Println("xxxx2", err, rep.Count, rep.Kvs)

	client := newSessionClient()
	err = client.Dial("localhost:1234")
	log.Println("dial结果", err)

	//port := rand.Intn(100) + 1000
	port := 1234
	go startServer(port)

	time.Sleep(time.Second)
	reply, err := client.Client.Ping(context.Background(), &pb.Message{Content: "hello"})
	log.Println("xxxxxx", reply, err)

	<-make(chan bool)
}
