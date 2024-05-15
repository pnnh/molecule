package main


/*
#include "c/include/a.h"
*/
import "C"

func main() {
	v := 42
	C.printint(C.int(v))
}
