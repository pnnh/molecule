package config

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
)

var ACCOUNT_DB_DSN = ""
var REDIS = ""
var GINMODE = "release"
var ISSUER = "sfx.xyz" // TOTP发行机构
var JWTRealm = "sfx.xyz"
var JWTKey = ""
var CSRFToken = ""
var ServerUrl = "https://sfx.xyz"
var DefaultPhotoUrl = ""
var QuestKey = ""
var RunVersion = "0.1.0" // 当前程序版本标识，在构建时自动生成

var (
	MailHost     = ""
	MailPort     = 587
	MailUser     = ""
	MailPassword = ""
)

func init() {

	mode := os.Getenv("MODE")
	if len(mode) > 0 {
		GINMODE = mode
	}
	configMap, err := GetConfigurationMap()
	if err != nil {
		logrus.Fatalln("获取appconfig配置出错: %w", err)
	}

	ACCOUNT_DB_DSN = configMap["ACCOUNT_DB"]
	if len(ACCOUNT_DB_DSN) < 1 {
		logrus.Fatalln("数据库未配置")
	}

	REDIS = configMap["REDIS"]
	if len(REDIS) < 1 {
		logrus.Fatalln("Redis未配置")
	}

	JWTKey = configMap["JWT_KEY"]
	CSRFToken = configMap["CSRF_TOKEN"]
	if len(JWTKey) < 1 {
		JWTKey = uuid.New().String()[:32]
	}
	if len(CSRFToken) < 1 {
		CSRFToken = uuid.New().String()[:32]
	}
	if Debug() {
		ServerUrl = "http://127.0.0.1:5000"
	}
}

func Debug() bool {
	return GINMODE == gin.DebugMode
}

func Test() bool {
	return GINMODE == gin.TestMode
}

func Release() bool {
	return GINMODE != gin.DebugMode && GINMODE != gin.TestMode
}
