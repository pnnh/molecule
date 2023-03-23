package handlers

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	helpers2 "github.com/pnnh/multiverse-cloud-server/helpers"
	"net/http"
	"strings"

	"github.com/pnnh/multiverse-cloud-server/models"

	"github.com/pnnh/quantum-go/config"

	"github.com/gin-gonic/gin"
	"github.com/go-webauthn/webauthn/protocol"
	"github.com/go-webauthn/webauthn/webauthn"
	"github.com/sirupsen/logrus"
)

var webAuthn *webauthn.WebAuthn

func InitWebauthn() {
	webauthnConfig := &webauthn.Config{
		RPDisplayName: "Multiverse",                                       // Display Name for your site
		RPID:          "multiverse.direct",                                // Generally the FQDN for your site
		RPOrigins:     []string{"https://debug.multiverse.direct"},        // The origin URL for WebAuthn requests
		RPIcon:        "https://multiverse.direct/static/images/logo.png", // Optional icon URL for your site
	}
	if config.Debug() {
		webauthnConfig.RPID = "debug.multiverse.direct"
		webauthnConfig.RPOrigins = []string{"https://debug.multiverse.direct"}
		webauthnConfig.Debug = true
	}
	var err error
	webAuthn, err = webauthn.New(webauthnConfig)
	if err != nil {
		logrus.Fatalln("webauthn初始化出错: %w", err)
	}

}

type WebauthnHandler struct {
}

func (s *WebauthnHandler) BeginRegistration(gctx *gin.Context) {

	username := gctx.Param("username")
	if len(username) < 1 {
		helpers2.ResponseCode(gctx, models.CodeInvalidParameter)
		return
	}

	model, err := models.GetAccount(username)
	if err != nil {
		helpers2.ResponseCodeMessageError(gctx, models.CodeError, "GetAccount error", err)
		return
	}
	if model != nil {
		helpers2.ResponseCodeMessageError(gctx, models.CodeError, "账号已存在", err)
		return
	}
	displayName := strings.Split(username, "@")[0]
	webauthnModel := models.NewWebauthnAccount(username, displayName)

	registerOptions := func(credCreationOpts *protocol.PublicKeyCredentialCreationOptions) {
		credCreationOpts.CredentialExcludeList = webauthnModel.CredentialExcludeList()
	}

	options, sessionData, err := webAuthn.BeginRegistration(
		webauthnModel,
		registerOptions,
	)
	if err != nil {
		helpers2.ResponseMessageError(gctx, "参数有误2", err)
		return
	}
	sessionBytes, err := json.Marshal(sessionData)
	if err != nil {
		helpers2.ResponseMessageError(gctx, "序列化sessionData出错: ", err)
		return
	}
	logrus.Infoln("sessionBytes: ", string(sessionBytes))
	sessionText := base64.StdEncoding.EncodeToString(sessionBytes)
	model.Session = sql.NullString{String: sessionText, Valid: true}
	logrus.Infoln("sessionData: ", sessionData)
	if err = models.PutAccount(model); err != nil {
		helpers2.ResponseMessageError(gctx, "PutAccount error", err)
		return
	}

	resp := make(map[string]interface{})
	resp["code"] = 200
	resp["data"] = map[string]interface{}{
		"session": username,
		"options": options.Response,
	}

	jsonResponse(gctx.Writer, resp, http.StatusOK)
}

func (s *WebauthnHandler) FinishRegistration(gctx *gin.Context) {
	logrus.Infoln("FinishRegistration333")
	username := gctx.Param("username")
	if len(username) < 1 {
		helpers2.ResponseMessageError(gctx, "参数有误a", nil)
		return
	}

	user, err := models.GetAccount(username)

	if err != nil {
		helpers2.ResponseMessageError(gctx, "参数有误5", err)
		return
	}
	if user == nil {
		helpers2.ResponseMessageError(gctx, fmt.Sprintf("GetAccount结果为空: %s", username), nil)
		return
	}
	sessionText := user.Session.String
	sessionBytes, err := base64.StdEncoding.DecodeString(sessionText)
	if err != nil {
		helpers2.ResponseMessageError(gctx, fmt.Sprintf("反序列化session出错: %s", username), nil)
		return
	}
	logrus.Infoln("sessionBytes2: ", string(sessionBytes))
	sessionData := webauthn.SessionData{}
	err = json.Unmarshal(sessionBytes, &sessionData)
	if err != nil {
		helpers2.ResponseMessageError(gctx, "序列化sessionData出错2: ", err)
		return
	}
	logrus.Infoln("sessionData2: ", sessionData)

	webauthnModel := models.CopyWebauthnAccount(user)
	credential, err := webAuthn.FinishRegistration(webauthnModel, sessionData, gctx.Request)
	if err != nil {
		helpers2.ResponseMessageError(gctx, "参数有误37", err)
		return
	}

	webauthnModel.AddCredential(*credential)

	err = models.UpdateAccountCredentials(webauthnModel)
	if err != nil {
		helpers2.ResponseMessageError(gctx, "UpdateAccountCredentials: %w", err)
		return
	}

	resp := make(map[string]interface{})
	resp["code"] = 200
	resp["data"] = "Registration Success"
	jsonResponse(gctx.Writer, "Registration Success", http.StatusOK)
}

func (s *WebauthnHandler) BeginLogin(gctx *gin.Context) {

	username := gctx.Param("username")
	if len(username) < 1 {
		helpers2.ResponseMessageError(gctx, "参数有误b", nil)
		return
	}

	// get user
	user, err := models.GetAccount(username)

	// user doesn't exist
	if err != nil {
		helpers2.ResponseMessageError(gctx, "参数有误316", err)
		return
	}

	if user == nil {
		helpers2.ResponseCode(gctx, models.CodeAccountNotExists)
		return
	}

	webauthnModel := models.CopyWebauthnAccount(user)
	options, sessionData, err := webAuthn.BeginLogin(webauthnModel)
	if err != nil {
		helpers2.ResponseMessageError(gctx, "参数有误39", err)
		return
	}

	err = models.UpdateAccountSession(user, sessionData)
	if err != nil {
		helpers2.ResponseMessageError(gctx, "UpdateAccountSession: %w", err)
		return
	}
	resp := make(map[string]interface{})
	resp["code"] = 200
	resp["data"] = map[string]interface{}{
		"session": username,
		"options": options.Response,
	}

	jsonResponse(gctx.Writer, resp, http.StatusOK)
}

func (s *WebauthnHandler) FinishLogin(gctx *gin.Context) {

	username := gctx.Param("username")
	if len(username) < 1 {
		helpers2.ResponseMessageError(gctx, "参数有误", nil)
		return
	}

	// get user
	user, err := models.GetAccount(username)

	// user doesn't exist
	if err != nil {
		helpers2.ResponseMessageError(gctx, "参数有误312", err)
		return
	}
	sessionData, err := models.UnmarshalWebauthnSession(user.Session.String)
	if err != nil {
		helpers2.ResponseMessageError(gctx, "参数有误3122", err)
		return
	}
	webauthnModel := models.CopyWebauthnAccount(user)
	_, err = webAuthn.FinishLogin(webauthnModel, *sessionData, gctx.Request)
	if err != nil {
		helpers2.ResponseMessageError(gctx, "参数有误315", err)
		return
	}

	jwtToken, err := helpers2.GenerateJwtToken(username)
	if (jwtToken == "") || (err != nil) {
		helpers2.ResponseMessageError(gctx, "参数有误316", err)
		return
	}

	resp := make(map[string]interface{})
	resp["code"] = 200
	resp["data"] = map[string]interface{}{"authorization": jwtToken}
	jsonResponse(gctx.Writer, resp, http.StatusOK)
}

func jsonResponse(w http.ResponseWriter, d interface{}, c int) {

	dj, err := json.Marshal(d)
	if err != nil {
		http.Error(w, "Error creating JSON response", http.StatusInternalServerError)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Test", "Custom")
	w.WriteHeader(c)
	fmt.Fprintf(w, "%s", dj)
}
