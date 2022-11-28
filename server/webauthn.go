package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"quantum/config"
	"quantum/models"
	"quantum/server/utils"
	"strings"

	"github.com/duo-labs/webauthn.io/session"
	"github.com/duo-labs/webauthn/protocol"
	"github.com/duo-labs/webauthn/webauthn"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

var webAuthn *webauthn.WebAuthn
var userDB *userdb
var sessionStore *session.Store

// Your initialization function
func init() {
	webauthnConfig := &webauthn.Config{
		RPDisplayName: "sfx",             // Display Name for your site
		RPID:          "sfx.xyz",         // Generally the FQDN for your site
		RPOrigin:      "https://sfx.xyz", // The origin URL for WebAuthn requests
		//RPIcon: "https://sfx.xyz/logo.png", // Optional icon URL for your site
	}
	if config.Debug() {
		webauthnConfig.RPID = "drm.sfx.xyz"
		webauthnConfig.RPOrigin = "https://drm.sfx.xyz"
		webauthnConfig.Debug = true
	}
	var err error
	webAuthn, err = webauthn.New(webauthnConfig)
	if err != nil {
		logrus.Fatalln("webauthn初始化出错: %w", err)
	}

	userDB = DB()

	sessionStore, err = session.NewStore()
	if err != nil {
		log.Fatal("failed to create session store:", err)
	}
}

func BeginRegistration(gctx *gin.Context) {

	username := gctx.Param("username")
	if len(username) < 1 {
		utils.ResponseServerError(gctx, "参数有误", nil)
		return
	}

	// get user
	user, err := userDB.GetUser(username)
	// user doesn't exist, create new user
	if err != nil {
		displayName := strings.Split(username, "@")[0]
		user = models.NewUser(username, displayName)
		userDB.PutUser(user)
	}

	registerOptions := func(credCreationOpts *protocol.PublicKeyCredentialCreationOptions) {
		credCreationOpts.CredentialExcludeList = user.CredentialExcludeList()
	}

	// generate PublicKeyCredentialCreationOptions, session data
	options, sessionData, err := webAuthn.BeginRegistration(
		user,
		registerOptions,
	)

	if err != nil {
		log.Println(err)
		utils.ResponseServerError(gctx, "参数有误2", err)
		return
	}

	// store session data as marshaled JSON
	err = sessionStore.SaveWebauthnSession("registration", sessionData, gctx.Request, gctx.Writer)
	if err != nil {
		log.Println(err)
		utils.ResponseServerError(gctx, "参数有误3", err)
		return
	}

	jsonResponse(gctx.Writer, options, http.StatusOK)
}

func FinishRegistration(gctx *gin.Context) {

	username := gctx.Param("username")
	if len(username) < 1 {
		utils.ResponseServerError(gctx, "参数有误a", nil)
		return
	}

	// get user
	user, err := userDB.GetUser(username)
	// user doesn't exist
	if err != nil {
		log.Println(err)
		utils.ResponseServerError(gctx, "参数有误5", err)
		return
	}

	// load the session data
	sessionData, err := sessionStore.GetWebauthnSession("registration", gctx.Request)
	if err != nil {
		log.Println(err)
		utils.ResponseServerError(gctx, "参数有误6", err)
		return
	}

	credential, err := webAuthn.FinishRegistration(user, sessionData, gctx.Request)
	if err != nil {
		log.Println(err)
		utils.ResponseServerError(gctx, "参数有误37", err)
		return
	}

	user.AddCredential(*credential)

	jsonResponse(gctx.Writer, "Registration Success", http.StatusOK)
}

func BeginLogin(gctx *gin.Context) {

	username := gctx.Param("username")
	if len(username) < 1 {
		utils.ResponseServerError(gctx, "参数有误b", nil)
		return
	}

	// get user
	user, err := userDB.GetUser(username)

	// user doesn't exist
	if err != nil {
		log.Println(err)
		utils.ResponseServerError(gctx, "参数有误316", err)
		return
	}

	// generate PublicKeyCredentialRequestOptions, session data
	options, sessionData, err := webAuthn.BeginLogin(user)
	if err != nil {
		log.Println(err)
		utils.ResponseServerError(gctx, "参数有误39", err)
		return
	}

	// store session data as marshaled JSON
	err = sessionStore.SaveWebauthnSession("authentication", sessionData, gctx.Request, gctx.Writer)
	if err != nil {
		log.Println(err)
		utils.ResponseServerError(gctx, "参数有误310", err)
		return
	}

	jsonResponse(gctx.Writer, options, http.StatusOK)
}

func FinishLogin(gctx *gin.Context) {

	username := gctx.Param("username")
	if len(username) < 1 {
		utils.ResponseServerError(gctx, "参数有误", nil)
		return
	}

	// get user
	user, err := userDB.GetUser(username)

	// user doesn't exist
	if err != nil {
		log.Println(err)
		utils.ResponseServerError(gctx, "参数有误312", err)
		return
	}

	// load the session data
	sessionData, err := sessionStore.GetWebauthnSession("authentication", gctx.Request)
	if err != nil {
		log.Println(err)
		utils.ResponseServerError(gctx, "参数有误314", err)
		return
	}

	// in an actual implementation, we should perform additional checks on
	// the returned 'credential', i.e. check 'credential.Authenticator.CloneWarning'
	// and then increment the credentials counter
	_, err = webAuthn.FinishLogin(user, sessionData, gctx.Request)
	if err != nil {
		log.Println(err)
		utils.ResponseServerError(gctx, "参数有误315", err)
		return
	}
	session := sessions.Default(gctx)

	session.Set("authuser", username)
	session.Save()

	// handle successful login
	jsonResponse(gctx.Writer, "Login Success", http.StatusOK)
}

// from: https://github.com/duo-labs/webauthn.io/blob/3f03b482d21476f6b9fb82b2bf1458ff61a61d41/server/response.go#L15
func jsonResponse(w http.ResponseWriter, d interface{}, c int) {
	dj, err := json.Marshal(d)
	if err != nil {
		http.Error(w, "Error creating JSON response", http.StatusInternalServerError)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(c)
	fmt.Fprintf(w, "%s", dj)
}
