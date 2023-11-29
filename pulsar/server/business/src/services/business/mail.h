//
// Created by azureuser on 4/17/23.
//

#ifndef PULSAR_MAIL_SERVICE_H
#define PULSAR_MAIL_SERVICE_H

#include <optional>
#include <vector>
#include <pqxx/pqxx>
#include "models/mail.h"

class MailService {
public:
    MailService();

    ~MailService();

    std::optional<std::vector<MailModel>> selectMails(int limit);

    int insertMail(const MailModel &model);

    int updateMail(const MailModel &model);

    int deleteMail(const std::string &pk);

    std::optional<MailModel> findMail(const std::string &pk);

    long count();

private:
    pqxx::connection connection;
};


#endif //PULSAR_MAIL_SERVICE_H
