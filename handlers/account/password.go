package account

import (
	helpers2 "github.com/pnnh/multiverse-cloud-server/helpers"
	"github.com/pnnh/quantum-go/config"
	"github.com/sirupsen/logrus"
	"net/http"
	"time"

	"github.com/pnnh/multiverse-cloud-server/models"

	"github.com/gin-gonic/gin"
	"github.com/pnnh/quantum-go/server/helpers"
)

func PasswordSignupBeginHandler(gctx *gin.Context) {
	username := gctx.PostForm("username")
	nickname := gctx.PostForm("nickname")
	if username == "" {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("account为空"))
		return
	}
	accountModel, err := models.GetAccountByUsername(username)
	if err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("account不存在"))
		return
	}
	if accountModel == nil {
		accountModel = &models.AccountModel{
			Pk:          helpers.NewPostId(),
			Username:    username,
			Password:    "",
			CreateTime:  time.Now(),
			UpdateTime:  time.Now(),
			Nickname:    nickname,
			Mail:        username,
			Credentials: "",
			Session:     "",
		}
		if err := models.PutAccount(accountModel); err != nil {
			gctx.JSON(http.StatusOK, models.CodeError.WithError(err))
			return
		}
	} else {
		gctx.JSON(http.StatusOK, models.CodeAccountExists.WithMessage("账号已存在"))
		return
	}

	session := &models.SessionModel{
		Pk:         helpers.MustUuid(),
		Content:    "",
		CreateTime: time.Now(),
		UpdateTime: time.Now(),
		User:       accountModel.Pk,
		Type:       "signup_password",
		Code:       helpers.RandNumberRunes(6),
	}

	if err := models.PutSession(session); err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.ToResult())
		return
	}

	sessionData := map[string]interface{}{
		"session": session.Pk,
	}

	result := models.CodeOk.WithData(sessionData)

	gctx.JSON(http.StatusOK, result)
}

func PasswordSignupFinishHandler(gctx *gin.Context) {
	session := gctx.PostForm("session")
	password := gctx.PostForm("password")
	if session == "" || password == "" {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("code或session为空"))
		return
	}
	sessionModel, err := models.GetSession(session)
	if err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("GetSession error"))
		return
	}
	if sessionModel == nil {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("sessionModel不存在"))
		return
	}
	if sessionModel.Type != "signup_password" {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("sessionModel类型不对"))
		return
	}
	encrypted, err := helpers.HashPassword(password)
	if err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("RsaEncryptString error"))
		return
	}

	if err := models.UpdateAccountPassword(sessionModel.User, encrypted); err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("UpdateAccountPassword error"))
		return
	}

	sessionData := map[string]interface{}{
		"session": sessionModel.Pk,
	}

	result := models.CodeOk.WithData(sessionData)

	gctx.JSON(http.StatusOK, result)
}

func PasswordSigninBeginHandler(gctx *gin.Context) {
	username := gctx.PostForm("username")
	if username == "" {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("account为空"))
		return
	}
	accountModel, err := models.GetAccountByUsername(username)
	if err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("account不存在"))
		return
	}
	if accountModel == nil {
		gctx.JSON(http.StatusOK, models.CodeAccountNotExists.WithMessage("account不存在"))
		return
	}

	session := &models.SessionModel{
		Pk:         helpers.MustUuid(),
		Content:    "",
		CreateTime: time.Now(),
		UpdateTime: time.Now(),
		User:       accountModel.Pk,
		Type:       "signin_password",
		Code:       helpers.RandNumberRunes(6),
	}

	if err := models.PutSession(session); err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.ToResult())
		return
	}

	sessionData := map[string]interface{}{
		"session": session.Pk,
	}

	result := models.CodeOk.WithData(sessionData)

	gctx.JSON(http.StatusOK, result)
}

func PasswordSigninFinishHandler(gctx *gin.Context) {
	session := gctx.PostForm("session")
	password := gctx.PostForm("password")
	if session == "" || password == "" {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("code或session为空"))
		return
	}
	sessionModel, err := models.GetSession(session)
	if err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("GetSession error"))
		return
	}
	if sessionModel == nil {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("sessionModel不存在"))
		return
	}
	account, err := models.GetAccount(sessionModel.User)
	if err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("GetAccount error"))
		return
	}

	ok := helpers.CheckPasswordHash(password, account.Password)

	if !ok {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("密码错误"))
		return
	}
	jwtKey, _ := config.GetConfigurationString("JWT_KEY")
	if jwtKey == "" {
		logrus.Fatalln("JWT_KEY未配置")
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("JWT_KEY未配置"))
		return
	}
	jwtToken, err := helpers2.GenerateJwtToken(account.Username, jwtKey)
	if (jwtToken == "") || (err != nil) {
		helpers2.ResponseMessageError(gctx, "参数有误316", err)
		return
	}

	sessionData := map[string]interface{}{
		"authorization": jwtToken,
	}

	result := models.CodeOk.WithData(sessionData)

	gctx.JSON(http.StatusOK, result)
}
