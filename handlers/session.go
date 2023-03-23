package handlers

import (
	helpers2 "github.com/pnnh/multiverse-cloud-server/helpers"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type SessionHandler struct {
}

func (s *SessionHandler) Introspect(gctx *gin.Context) {
	authHeader := gctx.Request.Header.Get("Authorization")

	jwtToken := strings.TrimPrefix(authHeader, "Bearer ")

	username, err := helpers2.ParseJwtToken(jwtToken)
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
