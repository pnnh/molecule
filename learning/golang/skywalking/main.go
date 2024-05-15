package main

import (

	"context"
	"fmt"
	"github.com/gorilla/mux"
	go2skyhttp "github.com/tetratelabs/go2sky/plugins/http"
	"log"
	"net/http"
	"net/http/httptest"
	"time"

	"github.com/tetratelabs/go2sky"
	"github.com/tetratelabs/go2sky/reporter"
)

func ExampleNewTracer() {

	r, err := reporter.NewGRPCReporter("127.0.0.1:6602")
	if err != nil {
		log.Fatalf("new reporter error %v \n", err)
	}
	defer r.Close()


	// Use gRPC reporter for production
	//r, err := reporter.NewLogReporter()
	//if err != nil {
	//	log.Fatalf("new reporter error %v \n", err)
	//}
	//defer r.Close()
	tracer, err := go2sky.NewTracer("example2", go2sky.WithReporter(r))
	if err != nil {
		log.Fatalf("create tracer error %v \n", err)
	}
	log.Println("sssss")
	// This for test
	tracer.WaitUntilRegister()
	log.Println("sssss2222")
	span, ctx, err := tracer.CreateLocalSpan(context.Background())
	if err != nil {
		log.Fatalf("create new local span error %v \n", err)
	}
	span.SetOperationName("invoke data")
	span.Tag("kind", "outer")
	time.Sleep(time.Second)
	log.Println("sssss3333")
	subSpan, _, err := tracer.CreateLocalSpan(ctx)
	if err != nil {
		log.Fatalf("create new sub local span error %v \n", err)
	}
	subSpan.SetOperationName("invoke inner")
	subSpan.Log(time.Now(), "inner", "this is right")
	time.Sleep(time.Second)
	log.Println("sssss4444")
	subSpan.End()
	time.Sleep(500 * time.Millisecond)
	span.End()
	time.Sleep(time.Second)
	log.Println("sssss5555")
	// Output:
}

func ExampleNewServerMiddleware() {
	// Use gRPC reporter for production
	//r, err := reporter.NewLogReporter()
	r, err := reporter.NewGRPCReporter("127.0.0.1:6602")
	if err != nil {
		log.Fatalf("new reporter error %v \n", err)
	}
	defer r.Close()

	tracer, err := go2sky.NewTracer("example", go2sky.WithReporter(r))
	if err != nil {
		log.Fatalf("create tracer error %v \n", err)
	}
	tracer.WaitUntilRegister()

	sm, err := go2skyhttp.NewServerMiddleware(tracer)
	if err != nil {
		log.Fatalf("create server middleware error %v \n", err)
	}

	client, err := go2skyhttp.NewClient(tracer)
	if err != nil {
		log.Fatalf("create client error %v \n", err)
	}

	router := mux.NewRouter()

	// create test server
	ts := httptest.NewServer(sm(router))
	defer ts.Close()

	// add handlers
	router.Methods("GET").Path("/A").HandlerFunc(middleFunc(client, ts.URL))
	router.Methods("POST").Path("/B").HandlerFunc(endFunc())

	// call end service
	request, err := http.NewRequest("GET", fmt.Sprintf("%s/A", ts.URL), nil)
	if err != nil {
		log.Fatalf("unable to create http request: %+v\n", err)
	}
	res, err := client.Do(request)
	if err != nil {
		log.Fatalf("unable to do http request: %+v\n", err)
	}
	_ = res.Body.Close()
	time.Sleep(time.Second)

	// Output:
}

func middleFunc(client *http.Client, url string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("middle func called with method: %s\n", r.Method)

		// do some operation
		time.Sleep(100 * time.Millisecond)

		newRequest, err := http.NewRequest("POST", url+"/B", nil)
		if err != nil {
			log.Printf("unable to create client: %+v\n", err)
			http.Error(w, err.Error(), 500)
			return
		}

		//Link the context of entry and exit spans
		newRequest = newRequest.WithContext(r.Context())

		res, err := client.Do(newRequest)
		if err != nil {
			log.Printf("call to end fund returned error: %+v\n", err)
			http.Error(w, err.Error(), 500)
			return
		}
		_ = res.Body.Close()
	}
}

func endFunc() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("end func called with method: %s\n", r.Method)
		time.Sleep(50 * time.Millisecond)
	}
}


func main() {
	//ExampleNewTracer()
	ExampleNewServerMiddleware()

	time.Sleep(time.Hour)
}

