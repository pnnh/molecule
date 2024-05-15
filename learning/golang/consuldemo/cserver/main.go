package main

import(
	"crypto/tls"
	"fmt"
	"log"
	"net"
	"net/http"

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
	svc, _ := connect.NewService("userinfo", client)
	defer svc.Close()

	mux := &http.ServeMux{}
	mux.HandleFunc("/user/mitchellh", func(w http.ResponseWriter, r *http.Request) {
		log.Println("jjjjj")
		w.Write([]byte("hello"))
	})
	// Creating an HTTP server that serves via Connect
	server := &http.Server{
		Addr:      ":8080",
		TLSConfig: svc.ServerTLSConfig(),
		// ... other standard fields
		Handler: mux,
	}

	// Serve!
	server.ListenAndServeTLS("", "")
}


func main1() {


	lis, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%d", 8899))
	if err != nil {
		log.Fatalln("main", "failed to listen: %v", err)
		return
	}

	serviceImpl :=  &sessionServer{}
	grpcServer := grpc.NewServer( )

	pb.RegisterSessionServer(grpcServer, serviceImpl)

	if err = grpcServer.Serve(lis); err != nil {
		log.Fatalln("服务停止", err)
	}

}
func main() {

	client, _ := api.NewClient(api.DefaultConfig())

	// Create an instance representing this service. "my-service" is the
	// name of _this_ service. The service should be cleaned up via Close.
	svc, _ := connect.NewService("grpchello", client)
	defer svc.Close()

	listener, _ := tls.Listen("tcp", ":8899", svc.ServerTLSConfig())
	defer listener.Close()


	serviceImpl :=  &sessionServer{}
	grpcServer := grpc.NewServer()

	pb.RegisterSessionServer(grpcServer, serviceImpl)

	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalln("服务停止", err)
	}

}