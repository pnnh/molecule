package authorizationserver

import (
	"log" 

	"github.com/gin-gonic/gin"
)

func IntrospectionEndpoint(gctx *gin.Context) {
	ctx := gctx.Request.Context()
	mySessionData := newSession("")
	ir, err := oauth2.NewIntrospectionRequest(ctx, gctx.Request, mySessionData)
	if err != nil {
		log.Printf("Error occurred in NewIntrospectionRequest: %+v", err)
		oauth2.WriteIntrospectionError(ctx, gctx.Writer, err)
		return
	}

	oauth2.WriteIntrospectionResponse(ctx, gctx.Writer, ir)
}
