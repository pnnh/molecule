package helpers

import (
	"flag"
	"os"
	"path"
	"runtime"
	"strconv"
	"strings"
	"time"

	"github.com/sirupsen/logrus"
	"gopkg.in/yaml.v2"
)

var globalConfigMap map[interface{}]interface{}

var configFile = flag.String("config", "config.yaml", "配置文件路径")

func MustLoadConfig() {
	configMap := make(map[interface{}]interface{})
	flag.Parse()

	if _, err := os.Stat(*configFile); err == nil {
		configData, err := os.ReadFile(*configFile)
		if err != nil {
			logrus.Fatalln("读取配置文件出错: ", err)
		}
		err = yaml.Unmarshal(configData, &configMap)
		if err != nil {
			logrus.Fatalln("解析配置文件出错: ", err)
		}
	}

	var cmdEnv []string

	osEnv := os.Environ()
	cmdEnv = append(cmdEnv, osEnv...)
	for _, e := range cmdEnv {
		index := strings.Index(e, "=")
		if index > 0 {
			configMap[e[:index]] = e[index+1:]
		}
	}

	globalConfigMap = configMap

	var filePrefix = "file://"
	var contentPrefix = "content://"
	for key, value := range globalConfigMap {
		stringValue, ok := value.(string)
		if !ok {
			continue
		}
		if strings.HasPrefix(stringValue, filePrefix) {
			valueData, err := os.ReadFile(value.(string)[len(filePrefix):])
			if err != nil {
				logrus.Fatalln("读取配置文件出错: ", err)
			}
			value = string(valueData)
			globalConfigMap[key] = value
		} else if strings.HasPrefix(value.(string), contentPrefix) {
			value = value.(string)[len(contentPrefix):]
			globalConfigMap[key] = value
		}
	}

	configLog()
}

func GetConfiguration(key interface{}) (interface{}, bool) {
	value, ok := globalConfigMap[key]
	return value, ok
}

func GetConfigurationString(key interface{}) (string, bool) {
	value, ok := globalConfigMap[key]
	if !ok {
		return "", false
	}
	stringValue, ok := value.(string)
	return stringValue, ok
}

func MustGetConfigurationString(key interface{}) string {
	value, ok := globalConfigMap[key]
	if !ok {
		logrus.Fatalln("配置项[%s]不存在", key)
	}
	stringValue, ok := value.(string)
	return stringValue
}

func GetConfigurationInt64(key interface{}) (int64, bool) {
	value, ok := globalConfigMap[key]
	if !ok {
		return 0, false
	}
	stringValue, ok := value.(string)
	if !ok {
		return 0, false
	}
	intValue, err := strconv.ParseInt(stringValue, 10, 64)
	if err != nil {
		return 0, false
	}
	return intValue, true
}

func GetConfigOrDefaultInt64(key interface{}, defaultValue int64) int64 {
	value, ok := globalConfigMap[key]
	if !ok {
		return defaultValue
	}
	switch v := value.(type) {
	case int:
		return int64(v)
	case string:
		stringValue, ok := value.(string)
		if !ok {
			return defaultValue
		}
		intValue, err := strconv.ParseInt(stringValue, 10, 64)
		if err != nil {
			return defaultValue
		}
		return intValue
	}
	return defaultValue
}

func configLog() {
	logrus.SetLevel(logrus.DebugLevel)
	logrus.SetReportCaller(true)
	logrus.SetFormatter(&logrus.TextFormatter{
		ForceColors:     true,
		TimestampFormat: time.RFC3339,
		CallerPrettyfier: func(frame *runtime.Frame) (function string, file string) {
			//处理文件名
			fileName := path.Base(frame.File)
			return "", fileName
		},
	})
}
