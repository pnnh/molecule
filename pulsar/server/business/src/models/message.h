//
// Created by azureuser on 4/9/23.
//

#ifndef PULSAR_MESSAGE_H
#define PULSAR_MESSAGE_H

#include <chrono>
#include <string>

struct MessageModel {
    std::string pk;
    std::string title;
    std::string content;
    std::chrono::system_clock::time_point create_time;
    std::chrono::system_clock::time_point update_time;
    std::string creator;
    std::string sender;
    std::string receiver;
};


#endif //PULSAR_MESSAGE_H
