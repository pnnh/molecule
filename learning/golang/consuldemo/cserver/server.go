package main

import (
	"context"

	"consuldemo/pb"
)

type sessionServer struct {
}


func (s *sessionServer) MsgAdd(ctx context.Context, in *pb.MsgAddIn) (*pb.MsgAddOut, error) {
	out := &pb.MsgAddOut{
		Body: "hello222000 " + in.From,
	}
	return out, nil
}