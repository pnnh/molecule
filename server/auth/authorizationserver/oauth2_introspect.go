package authorizationserver

import (
	// "encoding/json"
	// "errors"
	// "log"

	"log"

	"github.com/gin-gonic/gin"
	// "github.com/ory/fosite/handler/openid"
	// "github.com/pnnh/multiverse-cloud-server/server/models"
)

func IntrospectionEndpoint(gctx *gin.Context) {
	ctx := gctx.Request.Context()
	oauth2Session := newSession("xxx_introspection_user")
	// authToken := gctx.PostForm("token")
	// if authToken == "" {
	// 	log.Printf("Error occurred in NewIntrospectionRequest222")
	// 	oauth2.WriteIntrospectionError(ctx, gctx.Writer, errors.New("kkju"))
	// 	return
	// }
	// userSession, err := models.FindSessionByOAuth2(authToken)
	// if err != nil {
	// 	log.Printf("Error occurred in NewIntrospectionRequest333: %+v", err)
	// 	oauth2.WriteIntrospectionError(ctx, gctx.Writer, err)
	// 	return
	// }
	// oauth2Session := &openid.DefaultSession{}
	// if err = json.Unmarshal([]byte(userSession.Oauth2Session.String), oauth2Session); err != nil {
	// 	log.Printf("Error occurred in NewIntrospectionRequest444: %+v", err)
	// 	oauth2.WriteIntrospectionError(ctx, gctx.Writer, err)
	// 	return
	// }
	ir, err := oauth2.NewIntrospectionRequest(ctx, gctx.Request, oauth2Session)
	if err != nil {
		log.Printf("Error occurred in NewIntrospectionRequest: %+v", err)
		oauth2.WriteIntrospectionError(ctx, gctx.Writer, err)
		return
	}

	oauth2.WriteIntrospectionResponse(ctx, gctx.Writer, ir)
}
