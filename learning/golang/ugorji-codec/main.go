package main

import (
	"fmt"
	"log"
	"reflect"

	msgpack "github.com/vmihailenco/msgpack/v5"
)
type Item struct {
	Foo string
	Data []byte
}

type SubItemA struct {
	FooA string
}

type SubItemB struct {
	FooB string
}

func ExampleMarshal() {
	b, err := msgpack.Marshal(&Item{Foo: "bar"})
	if err != nil {
		panic(err)
	}

	var item Item
	err = msgpack.Unmarshal(b, &item)
	if err != nil {
		panic(err)
	}
	fmt.Println(item.Foo)
	// Output: bar
}

func ExampleMarshal2() []byte {
	item1 := &Item{
		Foo:  "a",
		Data: nil,
	}

	b, err := msgpack.Marshal(&SubItemA{FooA: "FooA"})
	if err != nil {
		panic(err)
	}
	item1.Data = b


	b, err = msgpack.Marshal(item1)
	if err != nil {
		panic(err)
	}
	return b
}

func PrintModel(b []byte) {
	item := &Item{}
	err := msgpack.Unmarshal(b, item)
	if err != nil {
		panic( err)
	}
	fmt.Println(item.Foo)

	if item.Foo == "a" {
		sa := &SubItemA{}
		err = msgpack.Unmarshal(item.Data, sa)
		if err != nil {
			panic(err)
		}
		fmt.Println("jj", sa.FooA)
	}

}

func PrintModel2(b []byte) {
	itemMap := make(map[string]interface{})

	err := msgpack.Unmarshal(b, &itemMap)
	if err != nil {
		panic( err)
	}
	fmt.Println(itemMap)

	if data, ok := itemMap["Data"].([]byte); ok {
		fmt.Println("jjj2", data)

		dataMap := make(map[string]interface{})

		err := msgpack.Unmarshal(data, &dataMap)
		if err != nil {
			panic( err)
		}
		fmt.Println("jj333", dataMap)

	}

}

func Example3() {
	data := make(map[string]interface{})

	data["head"] = -1
	data["name"] = "haha"

	b, err := msgpack.Marshal(data)
	if err != nil {
		log.Println("jjj", err)
		return
	}
	undata := make(map[string]interface{})
	err = msgpack.Unmarshal(b, &undata)
	if err != nil {
		log.Println("jjj222", err)
		return
	}
	if head, ok := undata["head"].(int); ok {
		log.Println("head is ", head)
	} else {
		log.Println("head type ", reflect.TypeOf(undata["head"]))
	}
	if name, ok := undata["name"].(string); ok {
		log.Println("name is ", name)
	}
}

func main() {
	//ExampleMarshal()
	Example3()

	return

	data := ExampleMarshal2()
	PrintModel(data)
	PrintModel2(data)
}
