package handlers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin" 
	"github.com/pnnh/multiverse-cloud-server/server/helpers"
)

type SessionHandler struct {
}

func (s *SessionHandler) Introspect(gctx *gin.Context) {
	authHeader := gctx.Request.Header.Get("Authorization")

	jwtToken := strings.TrimPrefix(authHeader, "Bearer ")

	username, err := helpers.ParseJwtToken(jwtToken)
	if err != nil {
		helpers.ResponseCodeMessageError(gctx, 401, "token解析失败", err)
		return
	}

	resp := make(map[string]interface{})
	resp["code"] = 200
	resp["data"] = map[string]interface{}{
		"username": username, 
	}
	gctx.JSON(http.StatusOK, resp)
}
