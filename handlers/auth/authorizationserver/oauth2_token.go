package authorizationserver

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func TokenEndpoint(gctx *gin.Context) {
	rw := gctx.Writer
	req := gctx.Request

	ctx := req.Context()

	oauth2Session := newSession("xxx_token_user")
	// authToken := gctx.PostForm("code")
	// logrus.Infoln("authToken: ", authToken, gctx.Request.Form)
	// if authToken == "" {
	// 	log.Printf("Error occurred in NewIntrospectionRequestaaa")
	// 	oauth2.WriteIntrospectionError(ctx, gctx.Writer, errors.New("xxxfd"))
	// 	return
	// }
	// userSession, err := models.FindSessionByOAuth2(authToken)
	// if err != nil || userSession == nil {

	// 	log.Printf("Error occurred in NewIntrospectionRequestbbb: %+v", err)
	// 	oauth2.WriteIntrospectionError(ctx, gctx.Writer, err)
	// 	return
	// }
	// oauth2Session := &openid.DefaultSession{}
	// if err = json.Unmarshal([]byte(userSession.Oauth2Session.String), oauth2Session); err != nil {
	// 	log.Printf("Error occurred in NewIntrospectionRequestcccc: %+v", err)
	// 	oauth2.WriteIntrospectionError(ctx, gctx.Writer, err)
	// 	return
	// }

	accessRequest, err := oauth2.NewAccessRequest(ctx, req, oauth2Session)

	if err != nil {
		logrus.Printf("Error occurred in NewAccessRequest: %+v", err)
		oauth2.WriteAccessError(ctx, rw, accessRequest, err)
		return
	}

	if accessRequest.GetGrantTypes().ExactOne("client_credentials") {
		for _, scope := range accessRequest.GetRequestedScopes() {
			accessRequest.GrantScope(scope)
		}
	}

	response, err := oauth2.NewAccessResponse(ctx, accessRequest)
	if err != nil {
		logrus.Printf("Error occurred in NewAccessResponse: %+v", err)
		oauth2.WriteAccessError(ctx, rw, accessRequest, err)
		return
	}

	oauth2.WriteAccessResponse(ctx, rw, accessRequest, response)
}
