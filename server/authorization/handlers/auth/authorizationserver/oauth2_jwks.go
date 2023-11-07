package authorizationserver

import (
	// "encoding/json"
	// "errors"
	// "log"

	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/pnnh/quantum-go/config"
	"github.com/sirupsen/logrus"
	// "github.com/ory/fosite/handler/openid"
	// "multiverse-server/server/models"
)

func JwksEndpoint(gctx *gin.Context) {
	jwkString, ok := config.GetConfiguration("OAUTH2_JWK")
	if !ok {
		logrus.Fatalln("OAUTH2_JWK is not set")
	}
	gctx.Header("Content-Type", "application/json; charset=utf-8")
	resp := fmt.Sprintf(`{"keys":[%s]}`, jwkString)

	gctx.String(200, resp)
}
