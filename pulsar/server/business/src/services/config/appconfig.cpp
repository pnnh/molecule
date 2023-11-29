//
// Created by ubuntu on 2/13/22.
//

#include "appconfig.h"
#include <boost/algorithm/string/split.hpp>
#include <iostream>
#include <toml++/toml.h>

std::unordered_map<std::string, std::string> configMap;

std::string GetConfigItem(const std::string &key) { return configMap[key]; }

AppConfig::AppConfig() : tbl() {
    std::string configPath;

    configPath = "config/config.toml";

    tbl = toml::parse_file(configPath);
}

std::string AppConfig::GetConfigItem(const std::string &key) {
    return tbl.get(key)->as_string()->get();
}