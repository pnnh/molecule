package main

import (
	"log"
	"strings"
	"time"

	"github.com/Shopify/sarama"

)

const (
	//TopicRoomMetric = "test_producer_bench" 
	TopicRoomMetric = "room_metric_test" 
)

var accessLogProducer sarama.AsyncProducer


func init() {
	//brokers := "127.0.0.1:19092"
	brokers := "127.0.0.1:9092,127.0.0.2:9092"
	brokerList := strings.Split(brokers, ",")
	accessLogProducer = newAccessLogProducer(brokerList)
}

type accessLogEntry struct {
	encoded []byte
}

func (ale *accessLogEntry) Length() int {
	return len(ale.encoded)
}

func (ale *accessLogEntry) Encode() ([]byte, error) {
	return ale.encoded, nil
}

// 向topic发送消息
func SendMessage(data []byte) {
	if accessLogProducer == nil {
		return
	}
	accessLogProducer.Input() <- &sarama.ProducerMessage{
		Topic: TopicRoomMetric,
		Value: &accessLogEntry{encoded: data},
	}
}

func newAccessLogProducer(brokerList []string) sarama.AsyncProducer {
	config := sarama.NewConfig()
	config.Producer.RequiredAcks = sarama.WaitForLocal       // Only wait for the leader to ack
	config.Producer.Compression = sarama.CompressionSnappy   // Compress messages
	config.Producer.Flush.Frequency = 500 * time.Millisecond // Flush batches every 500ms

	producer, err := sarama.NewAsyncProducer(brokerList, config)
	if err != nil {
		log.Println("启动kafka生产者出错", err)
		return nil
	}

	go func() {
		for err := range producer.Errors() {
			log.Println("kafka生产者执行出错", err)
		}
	}()

	return producer
}
