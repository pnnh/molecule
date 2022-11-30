package middleware

import (
	"quantum/services"
	"quantum/services/db"
	"quantum/services/email"
	"quantum/services/templs"
)

type ServerMiddleware struct { 
	SqlxService *db.SqlxService
	Mail        *email.Service
	Templs      *templs.Service
	AwsS3       *services.AwsS3Service
	Redis       *services.RedisService
}
