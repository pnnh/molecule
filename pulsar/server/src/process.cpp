
#include "process.h"
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <signal.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <string>
#include "workflow/HttpMessage.h"
#include "workflow/HttpUtil.h"
#include "workflow/WFServer.h"
#include "workflow/WFHttpServer.h"
#include "workflow/WFFacilities.h"
#include "controllers/sitemap.h"

void process(WFHttpTask *httpTask)
{
    protocol::HttpRequest *request = httpTask->get_req();
    protocol::HttpResponse *response = httpTask->get_resp();

    auto request_uri = request -> get_request_uri();
    // todo: 后续改成路由匹配模式
    if (strcmp(request_uri, "/sitemap") == 0) {
        HandleSitemap(httpTask);
        return;
    } 

    long long seq = httpTask -> get_task_seq();
    protocol::HttpHeaderCursor cursor(request);
    std::string name;
    std::string value;
    char buf[8192];
    int len;

    response -> append_output_body_nocopy("<html>", 6);
    len = snprintf(buf, 8192, "<p>%s %s %s</p>", request -> get_method(),
        request -> get_request_uri(), request -> get_http_version());
    response -> append_output_body(buf, len);

    while (cursor.next(name, value)) {
        len = snprintf(buf, 8192, "<p>%s: %s</p>", name.c_str(), value.c_str());
        response->append_output_body(buf, len);
    }

    response->append_output_body_nocopy("</html>", 7);

    response->set_http_version("HTTP/1.1");
    response->set_status_code("200");
    response->set_reason_phrase("OK");

    response -> add_header_pair("Content-Type", "text/html");
    response -> add_header_pair("Server", "Sogou WFHttpServer");
    if (seq == 9) {
        response -> add_header_pair("Connection", "close");
    } else {
        response -> add_header_pair("Connection", "keep-alive");
    }

    char addrstr[128];
    struct sockaddr_storage addr;
    socklen_t l = sizeof addr;
    unsigned short port = 0;

    httpTask -> get_peer_addr((struct sockaddr *)&addr, &l);

    if (addr.ss_family == AF_INET) {
        struct sockaddr_in *s = (struct sockaddr_in *)&addr;
        port = ntohs(s -> sin_port);
        inet_ntop(AF_INET, &s -> sin_addr, addrstr, sizeof addrstr);
    } else if (addr.ss_family == AF_INET6) {
        struct sockaddr_in6 *s = (struct sockaddr_in6 *)&addr;
        port = ntohs(s -> sin6_port);
        inet_ntop(AF_INET6, &s -> sin6_addr, addrstr, sizeof addrstr);
    } else {
        strcpy(addrstr, "unknown");
    }

    fprintf(stderr, "seq: %lld, peer: %s:%hu\n", seq, addrstr, port);
}