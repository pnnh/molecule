package server

import (
	"context"
	"log"
	"strings"
	"suji"
)

type SujiServer struct {

}

func (s *SujiServer) Say(ctx context.Context, req *suji.SayRequest) (*suji.SayReply, error) {
	log.Println("收到:", req.Msg)

	reply := &suji.SayReply{}
	if strings.Contains(req.Msg, "讨厌") {
		reply.Msg = "我也讨厌你"
	}
	log.Println("回复:", reply.Msg)
	log.Println("内心:", "沙雕")

	return reply, nil
}