package main

import (
	"context"
	"io/ioutil"
	"log"
	"net"

	"github.com/hashicorp/consul/api"
	"github.com/hashicorp/consul/connect"
	"google.golang.org/grpc"

	"consuldemo/pb"
)

func main2() {
	// Create a Consul API client
	client, _ := api.NewClient(api.DefaultConfig())

	// Create an instance representing this service. "my-service" is the
	// name of _this_ service. The service should be cleaned up via Close.
	svc, _ := connect.NewService("aaaaaa", client)
	defer svc.Close()

	// Get an HTTP client
	httpClient := svc.HTTPClient()

	// Perform a request, then use the standard response
	resp, err := httpClient.Get("https://userinfo.service.consul/user/mitchellh")

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Println("jjj", err)
		return
	}
	log.Println("jjjj", err, string(data))
}

func main1() {
	// Create a Consul API client
	client, _ := api.NewClient(api.DefaultConfig())

	// Create an instance representing this service. "my-service" is the
	// name of _this_ service. The service should be cleaned up via Close.
	svc, _ := connect.NewService("aaaaaa", client)
	defer svc.Close()

	// Get an HTTP client
	httpClient := svc.HTTPClient()

	// Perform a request, then use the standard response
	resp, err := httpClient.Get("http://userinfo.service.consul/user/mitchellh")
	if err != nil {
		log.Println("jjj22", err)
		return
	}

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Println("jjj", err)
		return
	}
	log.Println("jjjj", err, string(data))
}

func main3() {
	Connect()
}

func main() {
	client, _ := api.NewClient(api.DefaultConfig())

	svc, _ := connect.NewService("my-service1", client)
	defer svc.Close()

	conn, err := grpc.DialContext(context.Background(), "tagserv", grpc.WithInsecure(),
		grpc.WithContextDialer(func(ctx context.Context, s string) (net.Conn, error) {
			log.Println("jjjjjaaaa", s)
			conn, err := svc.Dial(context.Background(), &connect.ConsulResolver{
				Client: client,
				Type: connect.ConsulResolverTypePreparedQuery,
				Name:  s,
			})
			return conn, err
		}))
	if err != nil {
		log.Fatalln("会话服务Dial出错 %s", err)
	}
	secli := pb.NewSessionClient(conn)

	in := &pb.MsgAddIn{From: "aa"}
	out, err :=  secli.MsgAdd(context.TODO(), in)
	log.Println("jjjj", out, err)
}
