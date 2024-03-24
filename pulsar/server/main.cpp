
// #include "server/server.h"
// #include "controllers/sitemap.h"
// #include "controllers/message.h"
// #include "controllers/mail.h"
#include <spdlog/spdlog.h>
#include <workflow/WFHttpServer.h>
#include "process.h"

int main(int argc, char *argv[]) {
#ifndef NDEBUG
    spdlog::set_level(spdlog::level::debug); // Set global log level to debug
#endif
    spdlog::debug("Hello, {}", "World!");

    std::string str = "Hello, World!";
    spdlog::debug("Hello, {}!", str);

    // auto server = PulsarServer();
    // server.RegisterHandler("/sitemap", HandleSitemap);
    // server.RegisterHandler("/message/get", MessageController::HandleGet);
    // server.RegisterHandler("/message/delete", MessageController::HandleDelete);
    // server.RegisterHandler("/message/insert", MessageController::HandleInsert);
    // server.RegisterHandler("/message/update", MessageController::HandleUpdate);
    // server.RegisterHandler("/message/select", MessageController::HandleSelect);
    // server.RegisterHandler("/mail/get", MailController::HandleGet);
    // server.RegisterHandler("/mail/delete", MailController::HandleDelete);
    // server.RegisterHandler("/mail/insert", MailController::HandleInsert);
    // server.RegisterHandler("/mail/update", MailController::HandleUpdate);
    // server.RegisterHandler("/mail/select", MailController::HandleSelect);


    WFHttpServer server(process);

    if (server.start(8888) == 0) {
        pause(); 
        server.stop();
    } else {
        perror("server start failed");
        exit(1);
    }

    return 0;
}
