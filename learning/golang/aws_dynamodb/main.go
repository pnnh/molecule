// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// snippet-start:[dynamodb.go.create_new_item]
package main

// snippet-start:[dynamodb.go.create_new_item.imports]
import (
	"flag"
	"fmt"
	"log"
	"sync"
	"time"

	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbiface"
	"github.com/google/uuid"
)

type Item struct {
	Sid string  `json:"sid"`
	Year   int
	Title  string
	Plot   string
	Rating float64
}

func AddTableItem(svc dynamodbiface.DynamoDBAPI, table *string, item Item) error {
	// snippet-start:[dynamodb.go.create_new_item.assign_struct]


	av, err := dynamodbattribute.MarshalMap(item)
	//log.Println("jjjj", av)
	// snippet-end:[dynamodb.go.create_new_item.assign_struct]
	if err != nil {
		return err
	}

	// snippet-start:[dynamodb.go.create_new_item.call]
	_, err = svc.PutItem(&dynamodb.PutItemInput{
		Item:      av,
		TableName: table,
	})
	// snippet-end:[dynamodb.go.create_new_item.call]
	if err != nil {
		return err
	}

	return nil
}

func main() {
	var  fgNum = flag.Int("num", 100, "")


	flag.Parse()

	sess := session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	svc := dynamodb.New(sess)
	num := *fgNum

	if num <= 0 {
		num = 100
	}

	log.Println("开始写入", time.Now())
	var wg = &sync.WaitGroup{}
	for i := 0; i < 10; i += 1 {
		wg.Add(1)
		go write(wg, svc, num)
	}
	wg.Wait()
	log.Println("全部写入完成", num, time.Now())
	//fmt.Println("Successfully added '"+ item.Title +"' ("+strconv.Itoa( item.Year)+") to table "+ table+" with rating", item.Rating)
}

func write(wg *sync.WaitGroup, svc dynamodbiface.DynamoDBAPI, num int) {
	defer wg.Done()
	for i := 0; i <= num; i += 1 {
		item := Item{
			Sid: uuid.New().String(),
			Year:   i + 1,
			Title:  "Hello",
			Plot:   "plot",
			Rating: float64(time.Now().Unix()),
		}
		table := "chat_sessions"
		err := AddTableItem(svc, &table, item)
		if err != nil {
			fmt.Println("出错了", err)
			return
		}
	}
}