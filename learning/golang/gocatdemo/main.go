package main

import (
	"errors"
	"math/rand"
	"time"

	"gocatdemo/go/gocat"
)

const TTYPE = "foo"

var cat = gocat.Instance()

// send transaction
func case1() {
	t := cat.NewTransaction("foo2", "test")
	defer t.Complete()
	t.AddData("testcase")
	t.AddData("foo", "bar")
	n := rand.Intn(100)
	if n % 3 == 0 {
		t.SetStatus(gocat.FAIL)
	}
	t.SetDurationStart(time.Now().UnixNano() - time.Second.Nanoseconds()*5)
	t.SetTimestamp(time.Now().UnixNano() - time.Second.Nanoseconds())
	t.SetDuration(int64(n * 100))
}


// send completed transaction with duration
func case2() {
	cat.NewCompletedTransactionWithDuration(TTYPE, "completed", time.Second.Nanoseconds()*24)
	cat.NewCompletedTransactionWithDuration(TTYPE, "completed-over-60s", time.Second.Nanoseconds()*65)
}

// send event
func case3() {
	// way 1
	e := cat.NewEvent(TTYPE, "event-1")
	e.Complete()
	// way 2
	cat.LogEvent(TTYPE, "event-2")
	n := rand.Intn(100)
	ok, ok2 := gocat.SUCCESS, gocat.SUCCESS
	if n % 3 == 0 {
		ok = gocat.FAIL
	}
	if n % 5 == 0 {
		ok2 = gocat.FAIL
	}
	cat.LogEvent(TTYPE, "event-3", ok)
	cat.LogEvent(TTYPE, "event-4", ok2, "foobar")
}

// send error with backtrace
func case4() {
	err := errors.New("error")
	cat.LogError(err)
}

// send metric
func case5() {
	cat.LogMetricForCount("metric-1")
	cat.LogMetricForCount("metric-2", 3)
	cat.LogMetricForDuration("metric-3", 150*time.Millisecond.Nanoseconds())
}
func run(f func()) {
	for {
		f()
		time.Sleep(time.Millisecond)
	}
}

func init() {

	config := gocat.DefaultConfig()
	config.EnableDebugLog = 1
	gocat.Init("gocat", config)
}

func main(){


	go run(case1)
	go run(case2)
	go run(case3)
	go run(case4)
	go run(case5)

	// wait until main process has been killed
	var ch chan int
	<-ch

}
