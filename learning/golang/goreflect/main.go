package main

import (
	"log"
	"reflect"
)

//type IService interface {
//	Action()
//}

type ServiceImpl struct {

}

func (s *ServiceImpl) Action() {

}

type AService interface {
	Hello(msg string)  error
}

type AService2 interface {
	Hello(msg string)  error
}
type AServiceImpl struct {

}

func (s *AServiceImpl) Hello(msg string) error {
	log.Println("打印", msg)
	return nil
}

type Ctrl struct {
	AService
}


func main() {
	a := &Ctrl{}
	a2 := Ctrl{}

	t := reflect.TypeOf(a)
	v := reflect.ValueOf(a)

	log.Println(t, )

	sf := reflect.TypeOf(a2).Field(0)//.FieldByName("AService")
	log.Println("kkk2",   sf.Type, sf.Name, sf.Tag)
	//log.Println("kkk", t.Kind(), sf, ok)
	//v4 := v.Elem().FieldByName("AService")
	//log.Println("kkk3", v4)
	//v4.Set(reflect.ValueOf(&AServiceImpl{}))

	if t.Kind() == reflect.Ptr {
		t = t.Elem()
		v = v.Elem()
	}

	for n := 0; n < v.NumField(); n += 1 {
		tf := t.Field(n)
		vf := v.Field(n)

		log.Println("kkk111",   tf.Type.String())

		if tf.Type.String() == "main.AService" {
			vf.Set(reflect.ValueOf(&AServiceImpl{}))
		}
		//switch tf..(type) {
		//case AService:
		//	log.Println("kkk5", f.Interface())
		//	vf.Set(reflect.ValueOf(&AServiceImpl{}))
		//default:
		//	log.Println("kkk6",, f.CanSet(), f.Interface(), reflect.TypeOf(f.Interface()))
		//}
	}


	log.Println("kkk4",  a.Hello("haha"))
	if as, ok := v.Interface().(AService); ok {

		log.Println("kkk7", v.Interface())
		t2 := reflect.TypeOf(as)
		v2 := reflect.ValueOf(as)
		log.Println("jjjjjjj", ok, t2, t2 == t )
		log.Println("jjjjjjj2",  v2, v2 == v)
		//sf, err := t.FieldByName("AService")
		//log.Println("jjjjjjj2", sf, err)
		//v2 := reflect.ValueOf(as)

		//sv :=t2.FieldByName("AService")
		//asImpl := &AServiceImpl{}
		//v2.Set(reflect.ValueOf(asImpl))
		t2.AssignableTo(reflect.TypeOf(as))
		//log.Println("sss", sv)
	}
}