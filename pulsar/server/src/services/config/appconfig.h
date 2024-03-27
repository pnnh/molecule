//
// Created by ubuntu on 2/13/22.
//

#ifndef SFX_SERVER_API_APPCONFIG_H
#define SFX_SERVER_API_APPCONFIG_H

#include <memory>
#include <string>
#include <libenvpp/env.hpp>

class AppConfig
{
public:
    static AppConfig &Default()
    {
        static AppConfig instance;
        return instance;
    }
    AppConfig(AppConfig const &) = delete;
    AppConfig &operator=(AppConfig const &) = delete;
    AppConfig();

    std::string GetDSN();

private:
    ~AppConfig() = default;
    std::shared_ptr<env::parsed_and_validated_prefix<env::prefix>> parsedEnvPrefixPtr;
    std::string dnsValue;
};

#endif // SFX_SERVER_API_APPCONFIG_H
