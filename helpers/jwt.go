package helpers

import (
	"fmt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/pnnh/quantum-go/config"
	"github.com/sirupsen/logrus"
)

var jwtKey string

func init() {
	jwtKey, _ = config.GetConfigurationString("JWT_KEY")
	if jwtKey == "" {
		logrus.Fatalln("JWT_KEY未配置")
	}
}

func GenerateJwtToken(username string) (string, error) {
	claims := jwt.MapClaims{
		"username": username,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(jwtKey))
}

func ParseJwtToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(jwtKey), nil
	})
	if err != nil {
		return "", fmt.Errorf("token解析失败: %v", err)
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		for key, value := range claims {
			if key == "username" {
				if strValue, ok := value.(string); ok {
					return strValue, nil
				}
			}
		}
	}
	return "", fmt.Errorf("token不存在")
}
