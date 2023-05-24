package authorizationserver

import (
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"time"

	"github.com/ory/fosite"
	"github.com/pnnh/quantum-go/config"
	"github.com/sirupsen/logrus"

	"github.com/ory/fosite/compose"
	"github.com/ory/fosite/handler/openid"
	"github.com/ory/fosite/token/jwt"
)

var (
	// Check the api documentation of `compose.Config` for further configuration options.
	fositeConfig = &fosite.Config{
		AccessTokenLifespan: time.Minute * 30,
		GlobalSecret:        secret,
		// ...
	}

	store = NewDatabaseStore()

	secret = []byte("some-cool-secret-that-is-32bytes")

	privateKey *rsa.PrivateKey
)

func InitOAuth2() {
	privateString, ok := config.GetConfiguration("OAUTH2_PRIVATE_KEY")
	if !ok {
		logrus.Fatalln("private key error22!")
	}
	block, _ := pem.Decode([]byte(privateString.(string))) //将密钥解析成私钥实例
	if block == nil {
		logrus.Fatalln("private key error333!")
	}
	priv, err := x509.ParsePKCS1PrivateKey(block.Bytes) //解析pem.Decode（）返回的Block指针实例
	if err != nil {
		logrus.Fatalln("privateKeyBytes", err)
	}
	privateKey = priv

	oauth2 = compose.ComposeAllEnabled(fositeConfig, store, privateKey)
}

var oauth2 fosite.OAuth2Provider

func getIssuer() string {
	issuer := "https://authsvc.bitpie.xyz"
	if !config.Debug() {
		issuer = "https://authsvc.diverse.site"
	}
	return issuer
}

func getResourcesServer() string {
	server := "https://ressvc.bitpie.xyz"
	if !config.Debug() {
		server = "https://ressvc.diverse.site"
	}
	return server
}

func newSession(user string) *openid.DefaultSession {
	issuer := getIssuer()
	return &openid.DefaultSession{
		Claims: &jwt.IDTokenClaims{
			Issuer:      issuer,
			Subject:     user,
			Audience:    []string{},
			ExpiresAt:   time.Now().Add(time.Hour * 6),
			IssuedAt:    time.Now(),
			RequestedAt: time.Now(),
			AuthTime:    time.Now(),
		},
		Subject:  user,
		Username: user,
		Headers: &jwt.Headers{
			Extra: make(map[string]interface{}),
		},
	}
}
