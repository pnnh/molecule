package main

import (
	"log"
)

func main() {
	serverIp := "localhost:6677"

	_, err := Connect(serverIp, 101)
	if err != nil {
		log.Fatalln("jjjj", err)
	}

	//sign, err := util.AesEncrypt(fmt.Sprintf("%d_%d_%d", 10010879, signVersion, 9999), AES_CHATKEY)

}
