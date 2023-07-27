package authorizationserver

import (
	"encoding/base64"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/pnnh/multiverse-cloud-server/helpers"
	"github.com/pnnh/multiverse-cloud-server/models"
	"github.com/pnnh/quantum-go/config"

	"github.com/sirupsen/logrus"

	"github.com/gin-gonic/gin"
)

func parseUsername(gctx *gin.Context) (string, error) {
	authCookie, err := gctx.Request.Cookie("Authorization")
	if err != nil && err != http.ErrNoCookie {
		logrus.Errorln("获取cookie失败", err)
		return "", err
	}
	authedUser := ""
	if authCookie != nil && authCookie.Value != "" {
		jwtToken := strings.TrimPrefix(authCookie.Value, "Bearer ")
		parsedClaims, err := helpers.ParseJwtTokenRs256(jwtToken, PublicKeyString)
		if err != nil && !errors.Is(err, jwt.ErrTokenExpired) {
			return "", err
		}
		if parsedClaims != nil {
			authedUser = parsedClaims.Subject
		}
	}
	return authedUser, nil
}

func AuthEndpointHtml(gctx *gin.Context) {
	ar, err := oauth2.NewAuthorizeRequest(gctx, gctx.Request)
	if err != nil {
		logrus.Printf("Error occurred in NewAuthorizeRequest: %+v", err)
		oauth2.WriteAuthorizeError(gctx, gctx.Writer, ar, err)
		return
	}
	webUrl, _ := config.GetConfigurationString("WEB_URL")
	if webUrl == "" {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("JWT_KEY未配置"))
		return
	}
	selfUrl, _ := config.GetConfigurationString("SELF_URL")
	if selfUrl == "" {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("SELF_URL未配置"))
		return
	}
	// 检查是否已经登录
	authCookie, err := gctx.Request.Cookie("Authorization")
	if err != nil && err != http.ErrNoCookie {
		logrus.Errorln("获取cookie出错2", err)
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("获取cookie出错2"))
		return
	}
	authedUser := ""
	if authCookie != nil && authCookie.Value != "" {
		jwtToken := strings.TrimPrefix(authCookie.Value, "Bearer ")
		parsedClaims, err := helpers.ParseJwtTokenRs256(jwtToken, PublicKeyString)
		if err != nil && !errors.Is(err, jwt.ErrTokenExpired) {
			logrus.Errorln("token解析失败", err)
		}
		if parsedClaims != nil {
			authedUser = parsedClaims.Subject
		}
	}
	sourceUrl := fmt.Sprintf("%s%s?%s", selfUrl, gctx.Request.URL.Path, gctx.Request.URL.RawQuery)
	sourceUrlQuery := base64.URLEncoding.EncodeToString([]byte(sourceUrl))
	if authedUser == "" {
		gctx.Redirect(http.StatusFound, fmt.Sprintf("%s%s?source=%s", webUrl, "/account/signin", sourceUrlQuery))
		return
	}
	webAuthUrl := fmt.Sprintf("%s%s?%s", webUrl, gctx.Request.URL.Path, gctx.Request.URL.RawQuery)
	if authedUser != "" {
		webAuthUrl += fmt.Sprintf("&authed=%s", authedUser)
	}

	gctx.Redirect(http.StatusFound, webAuthUrl)
}

func AuthEndpointJson(gctx *gin.Context) {
	ctx := gctx.Request.Context()

	username := gctx.PostForm("username")
	if username == "" {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("username为空2"))
		return
	}
	clientId := gctx.Query("client_id")
	if clientId == "" {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("client_id为空"))
		return
	}
	captchaKey := gctx.PostForm("captcha_key")
	if captchaKey == "" {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("captcha_key为空"))
		return
	}

	captchaModel, err := models.FindCaptcha(captchaKey)
	if captchaModel == nil || err != nil || captchaModel.Checked != 1 ||
		time.Now().Sub(captchaModel.CreateTime).Minutes() > 5 {
		logrus.Errorln("验证码错误", captchaKey, err)
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("验证码错误，请重试"))
		return
	}

	authedUser, err := parseUsername(gctx)
	if err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("username为空3"))
		return
	}
	// 若用户名不一致认为是重新登陆
	if username != authedUser {
		password := gctx.PostForm("password")
		if password == "" {
			gctx.JSON(http.StatusOK, models.CodeError.WithMessage("password为空"))
			return
		}
		accountModel, err := models.GetAccountByUsername(username)
		if err != nil {
			logrus.Errorln("查找用户出错", err)
			gctx.JSON(http.StatusOK, models.CodeError.WithMessage("查找用户出错"))
			return
		}

		if accountModel == nil || !helpers.CheckPasswordHash(password, accountModel.Password) {
			logrus.Errorln("用户不存在或密码不匹配")
			gctx.JSON(http.StatusOK, models.CodeError.WithMessage("密码签名出错"))
		}

		jwtToken, err := helpers.GenerateJwtTokenRs256(username, PrivateKeyString)
		if (jwtToken == "") || (err != nil) {
			helpers.ResponseMessageError(gctx, "参数有误316", err)
			return
		}

		gctx.SetCookie("Authorization", jwtToken, 3600*48, "/", "", false, true)
	}

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
	mySessionData := newSession(username)

	response, err := oauth2.NewAuthorizeResponse(ctx, ar, mySessionData)
	if err != nil {
		logrus.Printf("Error occurred in NewAuthorizeRequest: %+v", err)
		oauth2.WriteAuthorizeError(ctx, gctx.Writer, ar, err)
		return
	}

	authCode := response.GetCode()

	session := &models.SessionModel{
		Pk:           uuid.New().String(),
		Content:      "",
		CreateTime:   time.Now(),
		UpdateTime:   time.Now(),
		User:         username,
		Type:         "code",
		Code:         authCode,
		ClientId:     clientId,
		ResponseType: "",
		RedirectUri:  "",
		Scope:        "",
		State:        "",
		Nonce:        "",
		IdToken:      "",
		AccessToken:  "",
	}
	err = models.PutSession(session)
	if err != nil {
		logrus.Printf("Error occurred in NewAccessResponse2222: %+v", err)
		return
	}

	oauth2.WriteAuthorizeResponse(ctx, gctx.Writer, ar, response)
}
