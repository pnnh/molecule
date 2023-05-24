package handlers

import (
	helpers2 "github.com/pnnh/multiverse-cloud-server/helpers"
	"github.com/pnnh/multiverse-cloud-server/models"
	"github.com/pnnh/quantum-go/config"
	"github.com/sirupsen/logrus"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type SessionHandler struct {
}

func (s *SessionHandler) Introspect(gctx *gin.Context) {
	authHeader := gctx.Request.Header.Get("Authorization")

	jwtToken := strings.TrimPrefix(authHeader, "Bearer ")
	jwtKey, _ := config.GetConfigurationString("JWT_KEY")
	if jwtKey == "" {
		logrus.Fatalln("JWT_KEY未配置")
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("JWT_KEY未配置"))
		return
	}
	username, err := helpers2.ParseJwtToken(jwtToken, jwtKey)
	if err != nil {
		helpers2.ResponseCodeMessageError(gctx, 401, "token解析失败", err)
		return
	}

	resp := make(map[string]interface{})
	resp["code"] = 200
	resp["data"] = map[string]interface{}{
		"username": username,
	}
	gctx.JSON(http.StatusOK, resp)
}
