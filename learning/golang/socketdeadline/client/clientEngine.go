package main

import (
	"log"
	"net"
	"time"
)

type ClientEngine struct {
	version uint16
}

func Connect(serverIp string, version uint16) (*ClientEngine, error) {


	tcpAddr, err := net.ResolveTCPAddr("tcp4", serverIp)
	if err != nil {
		log.Println("Fatal error :", err.Error())
		return nil, err
	}

	conn, err := net.DialTCP("tcp", nil, tcpAddr)
	if err != nil {
		return nil, err
	}

	for {
		buf := []byte("12345")
		if _, err := conn.Write(buf); err != nil {
			log.Println("jjjj", err)
		}
		time.Sleep(time.Second * 1)
	}


}
