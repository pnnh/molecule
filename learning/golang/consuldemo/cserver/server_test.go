package main

import (
	"log"

	"github.com/hashicorp/consul/api"
)

const consulAddr = "127.0.0.1:8500"

func ExampleRegitserServiceToConsul() {
	//interval := time.Duration(2) * time.Second
	//deregister := time.Duration(8) * time.Second
	serv := &api.AgentServiceRegistration{
		Kind:    "",
		ID:      "aaa-4",                    //fmt.Sprintf("%v-%v-%v", cs.Name, cs.IP, cs.Port), // 服务节点的名称
		Name:    "grpchello",                 // 服务名称
		Tags:    []string{"aaa-tag", "pro"}, // tag，可以为空
		Port:    8899,                       // 服务端口
		Address: "127.0.0.1",                // 服务 IP
		Meta: map[string]string{"aaa-meta-1": "value-1",
			"env": "pro"},
		//TaggedAddresses: map[string]api.ServiceAddress{
		//	//"aaa-tag": {Address: "127.0.0.1", Port: 7788},
		//	"lan": {Address: "127.0.0.1", Port: 7788},
		//},
		//EnableTagOverride: true,
		//Check: &api.AgentServiceCheck{ // 健康检查
		//	Interval: interval.String(), // 健康检查间隔
		//	//GRPC:                           fmt.Sprintf("%v:%v/%v", cs.IP, cs.Port, cs.Name), // grpc 支持，执行健康检查的地址，service 会传到 Health.Check 函数中
		//	HTTP:                           fmt.Sprintf("http://%v:%v/%v",
		//		cs.IP, 999, cs.Name),
		//	DeregisterCriticalServiceAfter: deregister.String(), // 注销时间，相当于过期时间
		//},
		Connect: &api.AgentServiceConnect{
			Native: true,
		},
	}
	//err := RegitserServiceToConsul(reg)

	consulConfig := api.DefaultConfig()
	consulConfig.Address = consulAddr
	client, err := api.NewClient(consulConfig)
	if err != nil {
		log.Println("NewClient error ", err)
		return
	}
	// 取消注册
	//deRegitser(client, serv.ID)
	// 再注册
	//regitser(client, serv)

	agent := client.Agent()
	if err := agent.ServiceRegister(serv); err != nil {
		log.Println("服务注册出错", err, serv.Name, serv.ID)
		return
	}
	log.Println("ddddd", err)

	// Output: aa
}


func ExampleRegitserServiceToConsul2() {
	//interval := time.Duration(2) * time.Second
	//deregister := time.Duration(8) * time.Second
	serv := &api.AgentServiceRegistration{
		Kind:    "",
		ID:      "aaa-5",                    //fmt.Sprintf("%v-%v-%v", cs.Name, cs.IP, cs.Port), // 服务节点的名称
		Name:    "grpchello",                 // 服务名称
		Tags:    []string{"fat"}, // tag，可以为空
		Port:    8898,                       // 服务端口
		Address: "127.0.0.1",                // 服务 IP
		Meta: map[string]string{"env": "fat"},
		Connect: &api.AgentServiceConnect{
			Native: true,
		},
		Namespace: "aaaa",
	}

	consulConfig := api.DefaultConfig()
	consulConfig.Address = consulAddr
	client, err := api.NewClient(consulConfig)
	if err != nil {
		log.Println("NewClient error ", err)
		return
	}
	// 取消注册
	//deRegitser(client, serv.ID)
	// 再注册
	//regitser(client, serv)

	agent := client.Agent()
	if err := agent.ServiceRegister(serv); err != nil {
		log.Println("服务注册出错", err, serv.Name, serv.ID)
		return
	}
	log.Println("ddddd", err)

	// Output: aa
}

func ExamplePreparedQuery() {

	consulConfig := api.DefaultConfig()
	consulConfig.Address = consulAddr
	client, err := api.NewClient(consulConfig)
	if err != nil {
		log.Println("NewClient error ", err)
		return
	}
	// 取消注册
	//deRegitser(client, serv.ID)
	// 再注册
	//regitser(client, serv)

	query := &api.PreparedQueryDefinition{
		Name: "tagserv",
		Service: api.ServiceQuery{
			Service:        "grpchello",
			Tags:           []string{"fat"},
			//Namespace: "aaaaa",
		},
	}
	_, _, err = client.PreparedQuery().Create(query, nil)
	if err != nil {
		log.Println("Query注册出错", err )
		return
	}
	log.Println("ddddd", err)

	// Output: aa
}

func ExampleNamespace() {

	consulConfig := api.DefaultConfig()
	consulConfig.Address = consulAddr
	client, err := api.NewClient(consulConfig)
	if err != nil {
		log.Println("NewClient error ", err)
		return
	}
	// 取消注册
	//deRegitser(client, serv.ID)
	// 再注册
	//regitser(client, serv)

	query := &api.Namespace{
		Name: "namespace1",
		Description: "a new namespace",
	}
	_, _, err = client.Namespaces().Create(query, nil)
	if err != nil {
		log.Println("namespace注册出错", err )
		return
	}
	log.Println("ddddd", err)

	// Output: aa
}

func ExampleKV() {

	consulConfig := api.DefaultConfig()
	consulConfig.Address = consulAddr
	client, err := api.NewClient(consulConfig)
	if err != nil {
		log.Println("NewClient error ", err)
		return
	}
	// 取消注册
	//deRegitser(client, serv.ID)
	// 再注册
	//regitser(client, serv)

	query := &api.KVPair{
		Key: "key1",
		Value: []byte("a new namespace"),
		Namespace: "aaaaa",
	}
	_,   err = client.KV().Put(query, nil)
	if err != nil {
		log.Println("namespace注册出错", err )
		return
	}
	log.Println("ddddd", err)

	// Output: aa
}

func ExampleServiceQuery() {
	consulConfig := api.DefaultConfig()
	consulConfig.Address = consulAddr
	client, err := api.NewClient(consulConfig)
	if err != nil {
		log.Println("NewClient error ", err)
		return
	}
	// 取消注册
	//deRegitser(client, serv.ID)
	// 再注册
	//regitser(client, serv)

	health := client.Health()
	q := &api.QueryOptions{
		Namespace: "aaaa",
	}
	a, b, c := health.Service("grpchello", "", true, q)

	log.Println("ddddd", a, b, c)
	for _, v := range a {
		log.Println("ddd==", v.Service)
	}


	// Output: aa
}
