package config

import (   
	"flag" 
	"os"
	"path"
	"runtime"
	"strings"
	"time"
  
	"github.com/sirupsen/logrus"
	"gopkg.in/yaml.v2"
)

var globalConfigMap map[interface{}]interface{}

var configFile = flag.String("config", "config.yml", "配置文件路径")
var runMode = flag.String("mode", "release", "运行模式(debug, release)")

func InitApp() {
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
	configMap["config"] = *configFile
	configMap["mode"] = *runMode

	globalConfigMap = configMap

	var filePrefix = "file://"
	for key, value := range globalConfigMap {
		if strings.HasPrefix(value.(string), filePrefix) {
			valueData, err := os.ReadFile(value.(string)[len(filePrefix):])
			if err != nil {
				logrus.Fatalln("读取配置文件出错: ", err)
			}
			value = string(valueData)
			globalConfigMap[key] = value
		}
	}

	configLog()
}


func GetConfiguration(key interface{}) (interface{}, bool) {
	value, ok := globalConfigMap[key]
	return value, ok
}

func Debug() bool {
	var mode, ok = GetConfiguration("mode")
	if ok && mode == "debug" {
		return true
	}
	return false
}
 

func configLog() {
 
	if Debug() {
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
	} else {
		logrus.SetLevel(logrus.ErrorLevel)
		logrus.SetReportCaller(false)
		logrus.SetFormatter(&logrus.TextFormatter{
			ForceColors:     false,
			TimestampFormat: time.RFC3339,
		})
	}
}