package slave

import "context"

type ServerImpl struct {


}

func (s *ServerImpl) Send(ctx context.Context, in *SendRequest) (*SendReply, error) {
	out := &SendReply{Device: in.Sid}
	return out, nil
}
