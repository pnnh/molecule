package main

import (
	"fmt"
	"log"
	"time"

	"github.com/apple/foundationdb/bindings/go/src/fdb"
	"github.com/garyburd/redigo/redis"
)

func redisGetSet(conn redis.Conn) {
	if _, err := conn.Do("SET", "hello", "world"); err != nil {
		log.Println("3333jjj", err)
	}
	reply, err := redis.String(conn.Do("GET", "hello"))
	if err != nil {
		log.Println("3333jjj22", err)
		return
	}
	fmt.Println(reply)
}

func setGet(db *fdb.Database) {

	_, err := db.Transact(func (tr fdb.Transaction) (ret interface{}, e error) {
		tr.Set(fdb.Key("hello"), []byte("world"))
		return
	})
	if err != nil {
		log.Fatalf("Unable to set FDB database value (%v)", err)
	}

	ret, err := db.Transact(func (tr fdb.Transaction) (ret interface{}, e error) {
		ret = tr.Get(fdb.Key("hello")).MustGet()
		return
	})
	if err != nil {
		log.Fatalf("Unable to read FDB database value (%v)", err)
	}

	v := ret.([]byte)
	fmt.Printf("hello, %s\n", string(v))
}

func main() {
	fdb.MustAPIVersion(620)
	db := fdb.MustOpenDefault()

	now := time.Now()

	for i := 0; i < 1000; i += 1 {
		setGet(&db)
	}

	//if conn, err := redis.Dial("tcp", "localhost:6379"); err != nil {
	//	log.Println("jjjj", err)
	//} else {
	//	for i := 0; i < 1000; i += 1 {
	//		redisGetSet(conn)
	//	}
	//}

	log.Println("jjj", time.Now().Sub(now).Milliseconds())
}