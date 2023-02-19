package protocols

const (
	CodeOk                 = 0
	CodeError              = 1
	CodeAccountExists      = 100 // 账号已存在
	CodeAccountNotExists   = 101 // 账号不存在
	CodeNotLogin           = 102
	CodeInvalidParameter   = 103
	MarkLangCustom         = 104
	MarkLangMarkdown       = 105
	ErrNotFound            = 106
	StatusAccountExists    = 107 // 账号已存在
	StatusLoginCodeInvalid = 108 // 登录验证码无效
)

func CodeMessage(code int) string {
	switch code {
	case ErrNotFound:
		return "资源未找到"
	}
	return "未知错误" // 未知错误
}
