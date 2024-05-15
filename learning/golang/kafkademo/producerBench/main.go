package main

import (
	"log"
	"sync"
	"time"
)

func main() {
	start := time.Now()
	wg := &sync.WaitGroup{}
	for n := 0; n < 300 * 10000; n += 1 {
		wg.Add(1)
		go doEnter(wg)
	}
	wg.Wait()
	log.Println("==>", start, time.Now().Sub(start).Seconds())
	time.Sleep(time.Hour)
}

func doEnter(wg *sync.WaitGroup) {
	start := time.Now()
	defer func() {
		//log.Println("-->", time.Now().Sub(start).Milliseconds())
		duration := time.Now().Sub(start).Milliseconds()
		if duration > 50 {
			log.Println("-->", duration)
		}
		wg.Done()
	}()
	SendMessage([]byte("0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789"))
}