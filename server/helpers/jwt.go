package helpers

import (
	"fmt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/pnnh/quantum-go/config"
)

func GenerateJwtToken(username string) (string, error) {
	claims := jwt.MapClaims{
		"username": username,
	}
	jwtKey, ok := config.GetConfigurationString("JWT_KEY")
	if !ok || jwtKey == "" {
		return "", fmt.Errorf("JWT_KEY未配置")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(jwtKey))
}