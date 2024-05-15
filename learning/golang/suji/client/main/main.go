package main

import (
	"log"
	"strings"
	"suji/client"
)

func main() {
	addr := "127.0.0.1:1301"

	c := client.LinkSujiServer(addr)

	msg := "我喜欢你"
	log.Println("发送:", msg)
	rep := client.Say(c, msg)

	log.Println("收到:", rep.Msg)

	if strings.Contains(rep.Msg, "喜欢") {
		log.Println("内心:", "好开心啊")
	}
}
