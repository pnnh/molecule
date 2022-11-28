package auth

import (
	"quantum/server/auth/authorizationserver"
	"quantum/server/auth/oauth2client"
	"quantum/server/auth/resourceserver"
	"quantum/server/middleware"

	"github.com/gin-gonic/gin"
	goauth "golang.org/x/oauth2"
	"golang.org/x/oauth2/clientcredentials"
)

// A valid oauth2 client (check the store) that additionally requests an OpenID Connect id token
var ClientConf = goauth.Config{
	ClientID:     "my-client",
	ClientSecret: "foobar",
	RedirectURL:  "https://drm.sfx.xyz/callback",
	Scopes:       []string{"photos", "openid", "offline"},
	Endpoint: goauth.Endpoint{
		TokenURL: "https://drm.sfx.xyz/oauth2/token",
		AuthURL:  "https://drm.sfx.xyz/oauth2/auth",
	},
}

// The same thing (valid oauth2 client) but for using the client credentials grant
var appClientConf = clientcredentials.Config{
	ClientID:     "my-client",
	ClientSecret: "foobar",
	Scopes:       []string{"fosite"},
	TokenURL:     "https://drm.sfx.xyz/oauth2/token",
}

// Samle client as above, but using a different secret to demonstrate secret rotation
var appClientConfRotated = clientcredentials.Config{
	ClientID:     "my-client",
	ClientSecret: "foobaz",
	Scopes:       []string{"fosite"},
	TokenURL:     "https://drm.sfx.xyz/oauth2/token",
}

type authHandler struct {
	middleware *middleware.ServerMiddleware
}

func InitOAuth2(router *gin.Engine, middleware *middleware.ServerMiddleware) {
	handler := &authHandler{middleware: middleware}

	router.GET("/oauth2/auth", func(gctx *gin.Context) {
		authorizationserver.AuthEndpointGet(gctx)
	})
	router.POST("/oauth2/auth", func(gctx *gin.Context) {
		authorizationserver.AuthEndpoint(gctx)
	})
	router.POST("/oauth2/token", func(gctx *gin.Context) {
		authorizationserver.TokenEndpoint(gctx.Writer, gctx.Request)
	})
	router.GET("/oauth2/revoke", func(gctx *gin.Context) {
		authorizationserver.RevokeEndpoint(gctx.Writer, gctx.Request)
	})
	router.GET("/oauth2/introspect", func(gctx *gin.Context) {
		authorizationserver.IntrospectionEndpoint(gctx.Writer, gctx.Request)
	})

	router.GET("/oauth2", func(gctx *gin.Context) {
		oauth2client.HomeHandler(ClientConf)(gctx.Writer, gctx.Request)
	})

	router.GET("/client", func(gctx *gin.Context) {
		oauth2client.ClientEndpoint(appClientConf)(gctx.Writer, gctx.Request)
	})
	router.GET("/client-new", func(gctx *gin.Context) {
		oauth2client.ClientEndpoint(appClientConfRotated)(gctx.Writer, gctx.Request)
	})
	router.GET("/owner", func(gctx *gin.Context) {
		oauth2client.OwnerHandler(ClientConf)(gctx.Writer, gctx.Request)
	})
	router.GET("/callback", func(gctx *gin.Context) {
		oauth2client.CallbackHandler(ClientConf)(gctx.Writer, gctx.Request)
	})

	router.GET("/protected", func(gctx *gin.Context) {
		resourceserver.ProtectedEndpoint(appClientConf)(gctx.Writer, gctx.Request)
	})
}
