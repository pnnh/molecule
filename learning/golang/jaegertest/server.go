package main

import (
	"fmt"
	"io"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/opentracing/opentracing-go"
	"github.com/opentracing/opentracing-go/ext"
	openlog "github.com/opentracing/opentracing-go/log"

	"jaegertest/traceconfig"
)

var (
	tracer opentracing.Tracer
)

func listProcSub(spanCtx opentracing.SpanContext) {

	span := tracer.StartSpan("listProcSub", opentracing.ChildOf(spanCtx))
	defer span.Finish()

	span.SetTag("userid", 61482)
	val := span.BaggageItem("bag")
	log.Println("jjjbag ", val)

	span.LogKV("haha", "haha2" )

	time.Sleep(time.Millisecond * time.Duration(rand.Intn(100)))
}

type Obj struct {
	Key string
}

func GetListProc(w http.ResponseWriter, req *http.Request) {

	spanCtx, _ := tracer.Extract(opentracing.HTTPHeaders, opentracing.HTTPHeadersCarrier(req.Header))
	span := tracer.StartSpan("GetListProc", ext.RPCServerOption(spanCtx))
	defer span.Finish()

	fmt.Println("Get request getList")
	respList := []string{"l1", "l2", "l3", "l4", "l5"}
	respString := ""

	span.SetTag("userid", 61482)
	span.SetBaggageItem("bag", "bagval")

	for _, v := range respList {
		respString += v + ","
	}
	span.LogFields(openlog.String("logStr", "val"),
		openlog.Bool("logBool", true),
		openlog.Object("logObj", &Obj{Key:" objKey"}))

	listProcSub(span.Context())


	fmt.Println(respString)
	io.WriteString(w, respString)
}

func GetResultProc(w http.ResponseWriter, req *http.Request) {

	spanCtx, _ := tracer.Extract(opentracing.HTTPHeaders, opentracing.HTTPHeadersCarrier(req.Header))
	span := tracer.StartSpan("GetResultProc", ext.RPCServerOption(spanCtx))
	defer span.Finish()

	keys, ok := req.URL.Query()["num"]

	if !ok || len(keys[0]) < 1 {
		fmt.Println("No request parameter 'num' error! ")
		return
	}

	num, err := strconv.Atoi(keys[0])
	if err != nil {
		fmt.Println("num invalidate")
		return
	}

	result := 0

	for i := 0; i < num; i++ {
		result += i
	}

	respString := fmt.Sprintf("Result:%d", result)

	fmt.Println(respString)
	io.WriteString(w, respString)
}

func main() {
	var closer io.Closer
	tracer, closer = traceconfig.TraceInit("Trace-Server", "const", 1)
	defer closer.Close()

	http.HandleFunc("/getList", GetListProc)
	http.HandleFunc("/getResult", GetResultProc)

	http.ListenAndServe(":8080", nil)
}