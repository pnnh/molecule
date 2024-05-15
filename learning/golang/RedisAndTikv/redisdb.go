package main

import "github.com/garyburd/redigo/redis"
import (
	"time"
)

var pool *redis.Pool

func newPool(addr string, password string, db int) *redis.Pool {
	return &redis.Pool{
		MaxIdle:     3,
		IdleTimeout: 240 * time.Second,
		Dial: func() (redis.Conn, error) {
			return redis.Dial("tcp", addr)
		},
	}
}

func OpenRedis(addr string, password string, db int) {
	pool = newPool(addr, password, db)
}

func Close() {
	if pool != nil {
		pool.Close()
		pool = nil
	}
}

func Do(commandName string, args ...interface{}) (interface{}, error) {
	c := pool.Get()
	defer c.Close()

	return c.Do(commandName, args...)
}

func Set(key string, val interface{}) (interface{}, error) {
	return Do("SET", key, val)
}

func Get(key string) (interface{}, error) {
	return Do("GET", key)
}

func Del(key string) (interface{}, error) {
	return Do("DEL", key)
}

func Exists(key string) (interface{}, error) {
	return Do("EXISTS", key)
}

var ErrNil = redis.ErrNil
