package debug

import (
	"os"
	"strings"
)

// 检测当前是否在单元测试环境下执行
func IsTesting() bool {
	for _, arg := range os.Args {
		if strings.HasPrefix(arg, "-test.testlogfile") || strings.HasPrefix(arg, "-test.run") {
			return true
		}
	}
	return false
}
