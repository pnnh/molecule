package authorizationserver

import (
	"encoding/base64"
	"fmt"
	"github.com/pnnh/multiverse-cloud-server/helpers"
	"github.com/pnnh/multiverse-cloud-server/models"
	"github.com/pnnh/quantum-go/config"
	"net/http"
	"strings"

	"github.com/sirupsen/logrus"

	"github.com/gin-gonic/gin"
)

func AuthEndpointHtml(gctx *gin.Context) {
	ar, err := oauth2.NewAuthorizeRequest(gctx, gctx.Request)
	if err != nil {
		logrus.Printf("Error occurred in NewAuthorizeRequest: %+v", err)
		oauth2.WriteAuthorizeError(gctx, gctx.Writer, ar, err)
		return
	}

	webUrl, _ := config.GetConfiguration("WEB_URL")
	if webUrl == "" {
		logrus.Errorln("WEB_URL未配置")
		oauth2.WriteAuthorizeError(gctx, gctx.Writer, ar, err)
		return
	}
	webAuthUrl := fmt.Sprintf("%s%s?%s", webUrl, gctx.Request.URL.Path, gctx.Request.URL.RawQuery)
	authInfo := base64.URLEncoding.EncodeToString([]byte(webAuthUrl))
	webSigninUrl := fmt.Sprintf("%s/oauth2/signin?authinfo=%s", webUrl, authInfo)

	// 检查是否已登录
	authHeader := gctx.Request.Header.Get("Authorization")
	if authHeader == "" {
		gctx.Redirect(http.StatusFound, webSigninUrl)
		return
	}

	jwtToken := strings.TrimPrefix(authHeader, "Bearer ")
	jwtKey, _ := config.GetConfigurationString("JWT_KEY")
	if jwtKey == "" {
		logrus.Fatalln("JWT_KEY未配置")
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("JWT_KEY未配置"))
		return
	}
	_, err = helpers.ParseJwtToken(jwtToken, jwtKey)

	gctx.Redirect(http.StatusFound, webAuthUrl)
}

func AuthEndpointJson(gctx *gin.Context) {
	ctx := gctx.Request.Context()

	ar, err := oauth2.NewAuthorizeRequest(ctx, gctx.Request)
	if err != nil {
		logrus.Printf("Error occurred in NewAuthorizeRequest: %+v", err)
		oauth2.WriteAuthorizeError(ctx, gctx.Writer, ar, err)
		return
	}

	var requestedScopes string
	for _, this := range ar.GetRequestedScopes() {
		requestedScopes += fmt.Sprintf(`<li><input type="checkbox" name="scopes" value="%s">%s</li>`, this, this)
	}

	scopes := gctx.Request.PostForm["scopes"]
	for _, scope := range scopes {
		ar.GrantScope(scope)
	}

	mySessionData := newSession("peter")

	response, err := oauth2.NewAuthorizeResponse(ctx, ar, mySessionData)

	oauth2.WriteAuthorizeResponse(ctx, gctx.Writer, ar, response)
}
