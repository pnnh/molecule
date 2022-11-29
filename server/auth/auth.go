package auth

import (
	"quantum/server/auth/authorizationserver"
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

func InitOAuth2(router *gin.Engine, middleware *middleware.ServerMiddleware) {
	router.GET("/auth", func(gctx *gin.Context) {
		authorizationserver.AuthEndpointGet(gctx)
	})
	router.POST("/auth", func(gctx *gin.Context) {
		authorizationserver.AuthEndpoint(gctx)
	})
	router.POST("/token", func(gctx *gin.Context) {
		authorizationserver.TokenEndpoint(gctx.Writer, gctx.Request)
	})
	router.GET("/revoke", func(gctx *gin.Context) {
		authorizationserver.RevokeEndpoint(gctx.Writer, gctx.Request)
	})
	router.GET("/introspect", func(gctx *gin.Context) {
		authorizationserver.IntrospectionEndpoint(gctx.Writer, gctx.Request)
	})

	router.GET("/protected", func(gctx *gin.Context) {
		resourceserver.ProtectedEndpoint(appClientConf)(gctx.Writer, gctx.Request)
	})
}
