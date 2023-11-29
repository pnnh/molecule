package models

type CommonResult struct {
	Code    MCode       `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func NewCommonResult(code MCode, message string, data interface{}) *CommonResult {
	return &CommonResult{Code: code, Message: message, Data: data}
}

func ParseCommonResult(data interface{}) *CommonResult {
	if data == nil {
		return nil
	}
	if result, ok := data.(*CommonResult); ok {
		return result
	}
	return nil
}

func (r *CommonResult) SetCode(code MCode) *CommonResult {
	r.Code = code
	return r
}

func (r *CommonResult) SetMessage(message string) *CommonResult {
	r.Message = message
	return r
}
