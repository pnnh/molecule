package main

import (
	"log"
	"net"
	"strings"

	"github.com/pires/go-proxyproto"
)

func main() {
	// Create a listener
	addr := "0.0.0.0:7400"
	list, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatalf("couldn't listen to %q: %q\n", addr, err.Error())
	}

	// Wrap listener in a proxyproto listener
	proxyListener := &proxyproto.Listener{Listener: list}
	defer proxyListener.Close()

for {

	// Wait for a connection and accept it
	conn, err := proxyListener.Accept()
	if err != nil {
		log.Println("jjjjj", err)
		continue
	}
	defer conn.Close()

	// Print connection details
	if conn.LocalAddr() == nil {
		log.Fatal("couldn't retrieve local address")
	}
	//log.Printf("local address: %q", conn.LocalAddr().String())

	if conn.RemoteAddr() == nil {
		log.Fatal("couldn't retrieve remote address")
	}
	remoteAddr := conn.RemoteAddr().String()
	if !strings.Contains(remoteAddr,"100.122") {
		log.Printf("remote address=======: %q", remoteAddr)
	} else {
		log.Printf("remote address: %q", remoteAddr)
	}
}

}