package socket

import (
	"log"
	"net"
	"time"
)

type PushServer struct {
	listener    net.Listener
}

func Listen(serverIp string, ) (server *PushServer, err error) {
	var listener net.Listener
	if listener, err = net.Listen("tcp", serverIp); err != nil {
		return
	}
	server = &PushServer{listener: listener}
	return
}

func (s *PushServer) Serve() (err error) {
	for {
		var conn net.Conn
		if conn, err = s.listener.Accept(); err != nil {
			return err
		}
		go readWorker(conn)
	}
}

// 读取客户端发来的协议包并处理
func readWorker(conn net.Conn) {
	for {
		 err := readBytes(conn)

		log.Println("jjjj",  err)
		time.Sleep(time.Second * 5)
	}
}

func readBytes(conn net.Conn) (error) {
	if e := conn.SetReadDeadline(time.Now().Add(time.Second * time.Duration(2))); e != nil {
		log.Println("SetReadDeadline出错", e)
	}

	var err error
	buf := make([]byte, 6)
	n, err := conn.Read(buf)
	log.Println("====11", n, string(buf), err)

	//rb := new(bytes.Buffer)
	//if _, err = io.CopyN( rb, conn, 6); err != nil {
	//	log.Println("复制数据出错", err)
	//}

	time.Sleep(time.Second * 5)

	if e := conn.SetReadDeadline(time.Now().Add(time.Second * time.Duration(2))); e != nil {
		log.Println("SetReadDeadline出错", e)
	}

	n, err = conn.Read(buf)
	log.Println("====22", n, string(buf), err)

	return err
}