package account

import (
	"database/sql"
	"net/http"
	"time"

	"github.com/pnnh/multiverse-cloud-server/models"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/pnnh/quantum-go/config"
	"github.com/pnnh/quantum-go/server/helpers"
	"github.com/pnnh/quantum-go/services/email"
)

func MailSignupBeginHandler(gctx *gin.Context) {
	username := gctx.PostForm("username")
	nickname := gctx.PostForm("nickname")
	if username == "" {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("account为空"))
		return
	}
	validate := validator.New()
	if err := validate.Var(username, "required,email"); err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("account格式错误"))
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
			Account:     username,
			Password:    "",
			CreateAt:    time.Now(),
			UpdateAt:    time.Now(),
			Nickname:    nickname,
			Mail:        sql.NullString{String: username},
			Credentials: sql.NullString{String: ""},
			Session:     sql.NullString{String: ""},
		}
		if err := models.PutAccount(accountModel); err != nil {
			gctx.JSON(http.StatusOK, models.CodeError.WithError(err))
			return
		}
	}

	mailSender := config.MustGetConfigurationString("MAIL_SENDER")
	if len(mailSender) < 3 {
		gctx.JSON(http.StatusOK, models.CodeAccountExists.WithMessage("邮箱发送者未配置"))
		return
	}

	session := &models.SessionModel{
		Pk:         helpers.NewPostId(),
		Content:    "",
		CreateTime: time.Now(),
		UpdateTime: time.Now(),
		User:       accountModel.Pk,
		Type:       "register",
		Code:       sql.NullString{String: helpers.RandNumberRunes(6)},
	}

	if err := models.PutSession(session); err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.ToResult())
		return
	}

	subject := "注册验证码"
	body := "您的验证码是: " + session.Code.String

	err = email.SendMail(mailSender, subject, body, username)
	if err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.ToResult())
		return
	}

	sessionData := map[string]interface{}{
		"session": session.Pk,
	}

	result := models.CodeOk.WithData(sessionData)

	gctx.JSON(http.StatusOK, result)
}

func MailSignupFinishHandler(gctx *gin.Context) {
	session := gctx.PostForm("session")
	code := gctx.PostForm("code")
	if session == "" || code == "" {
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
	if sessionModel.Code.String != code {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("验证码错误"))
		return
	}
	sessionData := map[string]interface{}{
		"session": sessionModel.Pk,
	}

	result := models.CodeOk.WithData(sessionData)

	gctx.JSON(http.StatusOK, result)
}

func MailSigninBeginHandler(gctx *gin.Context) {
	username := gctx.PostForm("username")
	if username == "" {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("account为空"))
		return
	}
	validate := validator.New()
	if err := validate.Var(username, "required,email"); err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("account格式错误"))
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

	mailSender := config.MustGetConfigurationString("MAIL_SENDER")
	if len(mailSender) < 3 {
		gctx.JSON(http.StatusOK, models.CodeAccountExists.WithMessage("邮箱发送者未配置"))
		return
	}

	session := &models.SessionModel{
		Pk:         helpers.NewPostId(),
		Content:    "",
		CreateTime: time.Now(),
		UpdateTime: time.Now(),
		User:       accountModel.Pk,
		Type:       "signin",
		Code:       sql.NullString{String: helpers.RandNumberRunes(6)},
	}

	if err := models.PutSession(session); err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.ToResult())
		return
	}

	subject := "登陆验证码"
	body := "您的验证码是: " + session.Code.String

	err = email.SendMail(mailSender, subject, body, username)
	if err != nil {
		gctx.JSON(http.StatusOK, models.CodeError.ToResult())
		return
	}

	sessionData := map[string]interface{}{
		"session": session.Pk,
	}

	result := models.CodeOk.WithData(sessionData)

	gctx.JSON(http.StatusOK, result)
}

// todo 这里不应该传session,而应该传username参数以供校验
// 如校验该账号下是否有匹配该验证码的登陆会话，并验证时效性
func MailSigninFinishHandler(gctx *gin.Context) {
	session := gctx.PostForm("session")
	code := gctx.PostForm("code")
	if session == "" || code == "" {
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

	if sessionModel.Code.String != code {
		gctx.JSON(http.StatusOK, models.CodeError.WithMessage("验证码错误"))
		return
	}
	sessionData := map[string]interface{}{
		"session": sessionModel.Pk,
	}

	result := models.CodeOk.WithData(sessionData)

	gctx.JSON(http.StatusOK, result)
}
