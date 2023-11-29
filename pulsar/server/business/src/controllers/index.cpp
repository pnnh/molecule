//
// Created by ubuntu on 12/25/21.
//

#include "index.h"
#include <iostream>
#include <fstream>
#include "utils/mime.h"

void HandleIndex(boost::beast::http::response<boost::beast::http::dynamic_body> &response_) {
    response_.result(boost::beast::http::status::ok);
    response_.keep_alive(false);
    response_.set(boost::beast::http::field::server, "Beast");

    boost::beast::ostream(response_.body()) << "Hello World";
}