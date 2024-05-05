//
// Created by ubuntu on 2/13/22.
//

#ifndef PULSAR_MESSAGE_SERVICE_H
#define PULSAR_MESSAGE_SERVICE_H

#include "server/models/article.h"
#include <optional>
//#include <pqxx/pqxx>
#include <vector>

class MessageService
{
public:
    MessageService();

    ~MessageService();

    std::optional<std::vector<ArticleModel>> selectMessages(int limit);

    int insertMessage(const ArticleModel &model);

    int updateMessage(const ArticleModel &model);

    int deleteMessage(const std::string &pk);

    std::optional<ArticleModel> findMessage(const std::optional<std::string> &uid, const std::optional<long> &nid);

    long count();

private:
   // pqxx::connection connection;
};

#endif // PULSAR_MESSAGE_SERVICE_H
