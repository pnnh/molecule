//
// Created by ubuntu on 2/13/22.
//

#ifndef SFX_SERVER_API_APPCONFIG_H
#define SFX_SERVER_API_APPCONFIG_H

#include <string>
#include <toml++/toml.h>

class AppConfig {
public:
    static AppConfig &Default() {
        static AppConfig instance;
        return instance;
    }
    AppConfig(AppConfig const &) = delete;
    AppConfig &operator=(AppConfig const &) = delete;
    AppConfig();
    std::string GetConfigItem(const std::string &key);
private:
    ~AppConfig() = default;
    toml::table tbl;
};

#endif //SFX_SERVER_API_APPCONFIG_H
