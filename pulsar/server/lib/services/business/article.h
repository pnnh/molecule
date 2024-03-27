//
// Created by ubuntu on 2/13/22.
//

#ifndef PULSAR_MESSAGE_SERVICE_H
#define PULSAR_MESSAGE_SERVICE_H

#include "models/article.h"
#include <optional>
#include <pqxx/pqxx>
#include <vector>

class MessageService {
public:
    MessageService();

    ~MessageService();

    std::optional<std::vector<MessageModel>> selectMessages(int limit);

    int insertMessage(const MessageModel &model);

    int updateMessage(const MessageModel &model);

    int deleteMessage(const std::string &pk);

    std::optional<MessageModel> findMessage(const std::string &pk);

    long count();

private:
    pqxx::connection connection;
};


#endif // PULSAR_MESSAGE_SERVICE_H
