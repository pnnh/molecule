package main

import (
	"RedisAndTikv/slave"
	"context"
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/tikv/client-go/config"
	"github.com/tikv/client-go/rawkv"
	"google.golang.org/grpc"
	"log"
	"net"
	"sync"
	"time"
)

func main() {
	//
	//go func() {
	//	for n := 0; n < 10; n += 1 {
	//		go testRedis(n)
	//	}
	//}()
	//
	//go func() {
	//	for n := 0; n < 10; n += 1 {
	//		go testTikv(n)
	//	}
	//}()
	//
	//go func() {
	//	for n := 0; n < 10; n += 1 {
	//		go testMysql(n)
	//	}
	//}()

	testgRPC(10)
	//testRedisGet(9)
}

func testRedis(n int) {
	OpenRedis("localhost:6379", "", 0)

	now := time.Now()
	for i := 0; i < 10000; i += 1 {
		key := fmt.Sprintf("key%d", i)
		if _, err := Set(key, "hello"); err != nil {
			log.Fatalln("设置失败", err)
		}
	}
	log.Println("Redis 耗时", n, time.Now().Sub(now).Milliseconds())
}

func testRedisGet(n int) {
	OpenRedis("localhost:6379", "", 0)

	now := time.Now()
	for i := 0; i < 10000; i += 1 {
		key := fmt.Sprintf("key%d", i)
		if _, err := Get(key); err != nil {
			log.Fatalln("设置失败", err)
		}
	}
	log.Println("Redis 耗时", n, time.Now().Sub(now).Milliseconds())
}


func testTikv(n int) {
	cli, err := rawkv.NewClient(context.TODO(), []string{"127.0.0.1:2379"}, config.Default())
	if err != nil {
		panic(err)
	}
	defer cli.Close()


	val := []byte("hello")

	now := time.Now()

	for i := 0; i < 10000; i += 1 {
		key := []byte(fmt.Sprintf("key%d", i))
		err = cli.Put(context.TODO(), key, val)
		if err != nil {
			log.Fatalln("设置失败", err)
		}
	}

	log.Println("Tikv 耗时", n, time.Now().Sub(now).Milliseconds())
}

func testMysql(n int) {
	db, err := sql.Open("mysql", "root:root@appinside@tcp(127.0.0.1:3306)/db_tars?charset=utf8mb4&loc=Local&parseTime=true")
	if err != nil {
		log.Fatalln("链接出错", err)
	}
	now := time.Now()
	for i := 0; i < 10000; i += 1 {
		key := []byte(fmt.Sprintf("key%d", i))

		_, err := db.Exec(
			"INSERT INTO t_kv(`key`, `value`) VALUES (?, ?);", key, "hello")
		if err != nil {
			log.Fatalln("设置失败", err)
		}
	}
	log.Println("Mysql 耗时", n, time.Now().Sub(now).Milliseconds())
}

func testgRPC(num int) {
	grpcServer := grpc.NewServer()
	lis, err := net.Listen("tcp","0.0.0.0:666")
	if err != nil {
		log.Fatalln("failed to listen", err)
		return
	}
	server := &slave.ServerImpl{}
	slave.RegisterSlaveServer(grpcServer, server)

	go func() {
		if err = grpcServer.Serve(lis); err != nil {
			log.Fatalln("服务启动出错", err)
		}
	}()

	conn, err := grpc.DialContext(context.Background(), "0.0.0.0:666", grpc.WithInsecure())
	if err != nil {
		log.Fatalln("链接服务出错", err)
	}

	client := slave.NewSlaveClient(conn)

	var wg sync.WaitGroup
	now := time.Now()

	for n := 0; n < num; n += 1 {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for i := 0; i < 10000; i += 1 {
				key := fmt.Sprintf("key%d", i)
				_, err = client.Send(context.Background(), &slave.SendRequest{Sid:key})
				if err != nil {
					log.Fatalln("gRPC 设置失败", err)
				}
			}
		}()
	}
	wg.Wait()

	log.Println("gRPC 耗时", num, time.Now().Sub(now).Milliseconds())
}