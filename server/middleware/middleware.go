package middleware

import (
	"github.com/pnnh/multiverse-server/services/templs"

	"github.com/pnnh/multiverse-server/services/email"

	"github.com/pnnh/multiverse-server/services"
)

type ServerMiddleware struct {
	//SqlxService *db.SqlxService
	Mail   *email.Service
	Templs *templs.Service
	AwsS3  *services.AwsS3Service
	Redis  *services.RedisService
}
