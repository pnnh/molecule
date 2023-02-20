package authorizationserver

import ( 
	"fmt"
	"net/http" 
 
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

	var requestedScopes string
	for _, this := range ar.GetRequestedScopes() {
		requestedScopes += fmt.Sprintf(`<li><input type="checkbox" name="scopes" value="%s">%s</li>`, this, this)
	}

	gctx.Redirect(http.StatusFound, "/authorization")
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

	for _, scope := range gctx.Request.PostForm["scopes"] {
		ar.GrantScope(scope)
	}

	mySessionData := newSession("peter")



	// When using the HMACSHA strategy you must use something that implements the HMACSessionContainer.
	// It brings you the power of overriding the default values.
	//
	// mySessionData.HMACSession = &strategy.HMACSession{
	//	AccessTokenExpiry: time.Now().Add(time.Day),
	//	AuthorizeCodeExpiry: time.Now().Add(time.Day),
	// }
	//

	// If you're using the JWT strategy, there's currently no distinction between access token and authorize code claims.
	// Therefore, you both access token and authorize code will have the same "exp" claim. If this is something you
	// need let us know on github.
	//
	// mySessionData.JWTClaims.ExpiresAt = time.Now().Add(time.Day)

	// It's also wise to check the requested scopes, e.g.:
	// if ar.GetRequestedScopes().Has("admin") {
	//     http.Error(rw, "you're not allowed to do that", http.StatusForbidden)
	//     return
	// }

	response, err := oauth2.NewAuthorizeResponse(ctx, ar, mySessionData)

	// oauth2SessionBytes, err := json.Marshal(mySessionData)
	// if err != nil {
	// 	logrus.Printf("序列化OAuth2 session出错", err)
	// 	oauth2.WriteAuthorizeError(ctx, gctx.Writer, ar, err)
	// 	return
	// }
	// if err != nil {
	// 	logrus.Printf("Error occurred in NewAuthorizeResponse: %+v", err)
	// 	oauth2.WriteAuthorizeError(ctx, gctx.Writer, ar, err)
	// 	return
	// }
	// code := response.GetParameters().Get("code") 
	// userSession := &models.SessionTable{
	// 	Pk:            helpers.NewPostId(),
	// 	Username:      "peter",
	// 	OAuth2Token:   sql.NullString{Valid: false},
	// 	OAuth2Code:    sql.NullString{String: code, Valid: true},
	// 	Oauth2Session: sql.NullString{String: string(oauth2SessionBytes), Valid: true},
	// 	CreateTime:    time.Now(),
	// 	UpdateTime:    time.Now(),
	// 	Webauthn:      sql.NullString{Valid: false},
	// }
	// if err = models.SaveSession(userSession); err != nil {
	// 	logrus.Printf("保存OAuth2 session出错", err)
	// 	oauth2.WriteAuthorizeError(ctx, gctx.Writer, ar, err)
	// 	return
	// }

	oauth2.WriteAuthorizeResponse(ctx, gctx.Writer, ar, response)
}
