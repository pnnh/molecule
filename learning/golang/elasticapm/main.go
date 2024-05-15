package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	"go.elastic.co/apm"
	"go.elastic.co/apm/module/apmhttp"
)

type aLogger struct {

}
// Debugf logs a message at debug level.
func (a *aLogger) Debugf(format string, args ...interface{}) {
	fmt.Println(format, args)
}

// Errorf logs a message at error level.
func (a *aLogger)  Errorf(format string, args ...interface{}) {
	log.Println(format, args)
}

type aHandler struct {

}
func subSpan4(ctx context.Context, path string, n int) {
	span, ctx := apm.StartSpan(ctx, path + " Subspan4", "aaa4.bbb4.ccc4")
	defer span.End()

	span.Context.SetTag("jjjj", "32323")
	span.Context.SetLabel("labjjj", 3332)
	time.Sleep(time.Duration(n / 2) * time.Millisecond)
}

func subSpan3(ctx context.Context, path string, n int) {
	span, ctx := apm.StartSpan(ctx, path + " Subspan3", "aaa3.bbb3.ccc3")
	defer span.End()

	time.Sleep(time.Duration(n / 2) * time.Millisecond)
}

func subSpan2(ctx context.Context, path string, n int) {
	span, ctx := apm.StartSpan(ctx, path + " Subspan2", "aaa3.bbb3.ccc3")
	defer span.End()

	y := rand.Intn(100)
	if y % 2 == 0 {
		e := apm.DefaultTracer.NewError(fmt.Errorf("subSpan2出现错误 %v", y))
		e.SetSpan(span)
		e.Send()
	}

	subSpan4(ctx, path, n)
	time.Sleep(time.Duration(n) * time.Millisecond)
}

func subSpan(ctx context.Context, path string, n int) {
	span,ctx := apm.StartSpan(ctx, path + " Subspan", "aaa.bbb.ccc")
	defer span.End()

	subSpan2(ctx, path, n)
	subSpan3(ctx, path, n)
	time.Sleep(time.Duration(n) * time.Millisecond)
}

func (a *aHandler) ServeHTTP(w http.ResponseWriter,  r *http.Request) {
	//span, ctx := apm.StartSpan(r.Context(), r.URL.Path, "ddddd.kkkk.uuuu")
	//defer span.End()
	//
	//
	//n := rand.Intn(100)
	//if n % 2 == 0 {
	//	w.WriteHeader(http.StatusInternalServerError)
	//	panic("jjjkjjj panic")
	//}
	//subSpan(ctx, r.URL.Path, n)
	log.Println("jjjjj", r.URL.Path)
}

func ServeHTTP(ctx context.Context, path string) {
	span, ctx := apm.StartSpan(ctx, path, "ddddd.kkkk.uuuu")
	defer span.End()


	n := rand.Intn(100)
	time.Sleep(time.Millisecond * time.Duration(n))
	subSpan(ctx, path, n)
	log.Println("jjjjj", path)
}

func RecoveryFunc(
	w http.ResponseWriter,
	req *http.Request,
	resp *apmhttp.Response,
	body *apm.BodyCapturer,
	tx *apm.Transaction,
	recovered interface{},
) {
	log.Println("Recory")

	n := rand.Intn(100)
	if n % 2 == 0 {
		e := apm.DefaultTracer.Recovered(fmt.Errorf("hahahahahh %d", n))
		e.SetTransaction(tx)
		e.Send()
	}
}

func handleHttp() {
	tx := apm.DefaultTracer.StartTransaction("handleHttp", "request")
	defer tx.End()

	ctx := apm.ContextWithTransaction(context.Background(), tx)

	n := rand.Intn(100)
	if n % 2 == 0 {
		e := apm.DefaultTracer.NewError(fmt.Errorf("出现错误 %v", n))
		e.SetTransaction(tx)
		e.Send()
	}

	ServeHTTP(ctx, "/Hello")
}

func main() {
	//var myHandler http.Handler = &aHandler{}
	apm.DefaultTracer.SetLogger(&aLogger{})
	apm.DefaultTracer.SetSpanFramesMinDuration(time.Second)
	//tracedHandler := apmhttp.Wrap(myHandler, apmhttp.WithRecovery(RecoveryFunc))

	//http.ListenAndServe(":8080", tracedHandler)
	for {
		handleHttp()
		time.Sleep(time.Second * 2)
	}
}