//
// Created by azureuser on 4/10/23.
//

#ifndef PULSAR_MESSAGE_CONTROLLER_H
#define PULSAR_MESSAGE_CONTROLLER_H

#include <boost/beast/core.hpp>
#include <boost/beast/http.hpp>
#include <boost/asio.hpp>
#include <chrono>
#include <cstdlib>
#include <ctime>
#include <iostream>
#include <memory>

#include "workflow/WFTaskFactory.h"

void HandleArticles(WFHttpTask *httpTask);
void HandleArticleGet(WFHttpTask *httpTask);

#endif //PULSAR_MESSAGE_CONTROLLER_H
