//
// Created by azureuser on 4/11/23.
//

#ifndef PULSAR_COMMON_RESULT_H
#define PULSAR_COMMON_RESULT_H

#include <string>

class CommonResult {
public:
    CommonResult(int code, std::string message) : code(code), message(std::move(message)) {}

    int getCode() const {
        return code;
    }

    void setCode(int code) {
        CommonResult::code = code;
    }

    const std::string &getMessage() const {
        return message;
    }

    void setMessage(const std::string &message) {
        CommonResult::message = message;
    }

private:
    uint16_t code;
    std::string message;
};


#endif //PULSAR_COMMON_RESULT_H
