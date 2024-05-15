package main

import (
	"bytes"
	"chatClientTcp/params"
	"encoding/gob"
	"github.com/gin-gonic/gin/json"
	"github.com/golang/protobuf/proto"
	"github.com/ugorji/go/codec"
	"gopkg.in/mgo.v2/bson"
	"log"
	"time"
)

func main() {
	//var (
	//	mh codec.MsgpackHandle
	////bincHandle codec.BincHandle
	////cborHandle codec.CborHandle
	//)
	//
	////var buf = bytes.NewBuffer([]byte{})
	//var buf = make([]byte, 0)
	//
	//enc := codec.NewEncoderBytes(&buf, &mh)
	////enc := gob.NewEncoder(buf)
	//
	msg := &params.NotifyRequest{
		Version  : 101,
		Platform   :999,
		Device  :"jhhhjhkhkhhk",
		UserId:12992,
		Sign:"dsfdfdsf",
	}
	//
	//if err := enc.Encode(msg); err != nil {
	//	log.Fatalln("jjj", err)
	//}
	//
	//jd, err := json.Marshal(msg)
	//log.Println("aaa222", len(jd),   err)
	//
	//gobBuf := bytes.NewBuffer([]byte{})
	//gobEnc := gob.NewEncoder(gobBuf)
	//
	//err2 := gobEnc.Encode(msg)
	//log.Println("aaa333", gobBuf.Len(),   err2)
	//
	//data, err := proto.Marshal(msg)
	//
	//log.Println("aaa", len(data), len(buf), err)
	////log.Println("aaa", len(data), buf.Len(), err)
	//

	num := 5000

	go enGob(msg, num)
	go enJson(msg, num)
	go enProtobuf(msg, num)
	go enMsgpack(msg, num)
	go enBson(msg, num)

	time.Sleep(time.Hour)
}


func enBson(msg *params.NotifyRequest, n int) {
	now := time.Now()
	totalSize := 0
	for i := 0; i < n; i += 1 {
		if data, err := bson.Marshal(msg); err != nil {
			log.Fatalln("enBson", err)
		} else {
			totalSize += len(data)
		}
	}
	log.Println("enBson", time.Now().Sub(now).Nanoseconds() / 1000, totalSize)
}


func enGob(msg *params.NotifyRequest, n int) {
	now := time.Now()
	totalSize := 0
	gobBuf := bytes.NewBuffer([]byte{})
	for i := 0; i < n; i += 1 {
		gobBuf.Reset()
		gobEnc := gob.NewEncoder(gobBuf)

		if err2 := gobEnc.Encode(msg); err2 != nil {
			log.Fatalln("enGob", err2)
		}
		totalSize += gobBuf.Len()
	}
	log.Println("enGob", time.Now().Sub(now).Nanoseconds() / 1000, totalSize)
}

func enJson(msg *params.NotifyRequest, n int) {
	now := time.Now()
	totalSize := 0
	for i := 0; i < n; i += 1 {
		if data, err := json.Marshal(msg); err != nil {
			log.Fatalln("enJson", err)
		} else {
			totalSize += len(data)
		}
	}
	log.Println("enJson", time.Now().Sub(now).Nanoseconds() / 1000, totalSize)
}

func enProtobuf(msg *params.NotifyRequest, n int) {
	now := time.Now()
	totalSize := 0
	for i := 0; i < n; i += 1 {
		if data, err := proto.Marshal(msg); err != nil {
			log.Fatalln("enProtobuf", err)
		} else {
			totalSize += len(data)
		}
	}
	log.Println("enProtobuf", time.Now().Sub(now).Nanoseconds() / 1000, totalSize)
}

func enMsgpack(msg *params.NotifyRequest, n int) {
	now := time.Now()
	totalSize := 0
	gobBuf := bytes.NewBuffer([]byte{})
	for i := 0; i < n; i += 1 {
		gobBuf.Reset()
		enc := codec.NewEncoder(gobBuf, &codec.MsgpackHandle{})
		if err := enc.Encode(msg); err != nil {
			log.Fatalln("enProtobuf", err)
		}
		totalSize += gobBuf.Len()
	}
	log.Println("enMsgpack", time.Now().Sub(now).Nanoseconds() / 1000, totalSize)
}