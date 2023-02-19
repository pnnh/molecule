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

	response, err := oauth2.NewAuthorizeResponse(ctx, ar, mySessionData)


	if err != nil {
		logrus.Printf("Error occurred in NewAuthorizeResponse: %+v", err)
		oauth2.WriteAuthorizeError(ctx, gctx.Writer, ar, err)
		return
	}

	oauth2.WriteAuthorizeResponse(ctx, gctx.Writer, ar, response)
}
