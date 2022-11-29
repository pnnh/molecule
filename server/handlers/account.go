package handlers

import (
	"context"
	"database/sql"
	"encoding/base64"
	"errors"
	"fmt"
	"mime"
	"net/http"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"quantum/config"
	"quantum/models"
	"quantum/server/handlers/otp"
	"quantum/server/middleware"
	"quantum/server/utils"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/gin-contrib/sessions"
	"github.com/google/uuid"
	"github.com/sirupsen/logrus"

	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
)

type accountHandler struct {
	middleware *middleware.ServerMiddleware
}

type accountPostIn struct {
	Account string `json:"account"`
}

type sessionPostIn struct {
	Account string `json:"account"`
	Code    string `json:"code"`
}

func (s *accountHandler) LoginByWebAuthn(gctx *gin.Context) {
	session := sessions.Default(gctx)
	authuser := session.Get("authuser")

	if authuser != nil {
		gctx.HTML(http.StatusOK, "account/logined.mst", gin.H{
			"username": authuser,
		})
		return
	}

	gctx.HTML(http.StatusOK, "account/webauthn.mst", gin.H{})
}
 
func NewAccountHandler(middleware *middleware.ServerMiddleware) *accountHandler {
	return &accountHandler{
		middleware,
	}
}
