package main

import (
	"fmt"
	"log"
	"time"

	bolt "go.etcd.io/bbolt"
)

func main() {

	// Open the my.db data file in your current directory.
	// It will be created if it doesn't exist.
	db, err := bolt.Open("my3.db", 0600, &bolt.Options{
		Timeout: 1 * time.Second,
		NoSync:true,
		NoGrowSync:true,NoFreelistSync:true,
	})
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	err  = db.Update(func(tx *bolt.Tx) error {
		//b, err := tx.CreateBucket([]byte("MyBucket"))
		//if err != nil {
		//	return fmt.Errorf("create bucket: %s", err)
		//}
		b := tx.Bucket([]byte("MyBucket"))
		for n := 0; n < 1000; n += 1 {
			 b.Put([]byte(fmt.Sprintf("key%d", n)), []byte("val"))
		}
		return nil
	})
	if err != nil {
		log.Println("打开更新事务出错", err)
	}

}