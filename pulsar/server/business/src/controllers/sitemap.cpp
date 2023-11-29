//
// Created by ubuntu on 2/16/22.
//

#include "sitemap.h"
#include <iostream>
#include <fstream>
#include "utils/mime.h"
#include "services/business/message.h"
#include "utils/datetime.h"
#include <boost/property_tree/ptree.hpp>
#include <boost/property_tree/xml_parser.hpp>

void HandleSitemap(boost::beast::http::request<boost::beast::http::dynamic_body> &request,
                   boost::beast::http::response<boost::beast::http::dynamic_body> &response) {
    response.set(boost::beast::http::field::content_type, "text/xml");

    boost::property_tree::ptree pt;

    pt.put("urlset.<xmlattr>.xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
    boost::property_tree::ptree homeNode;
    homeNode.put("url.loc", "https://sfx.xyz/");
    pt.add_child("urlset.url", homeNode.get_child("url"));

    auto articlesList = MessageService().selectMessages(100);
    if (articlesList == std::nullopt) {
        response.result(boost::beast::http::status::not_found);
        return;
    }
    for (const auto &article: *articlesList) {
        boost::property_tree::ptree urlNode;
        urlNode.put("url.loc", "https://sfx.xyz/article/read/" + article.pk);
        urlNode.put("url.lastmod", formatTime(article.update_time));
        pt.add_child("urlset.url", urlNode.get_child("url"));
    }
    std::ostringstream oss;
    boost::property_tree::write_xml(oss, pt);
    boost::beast::ostream(response.body()) << oss.str();
}