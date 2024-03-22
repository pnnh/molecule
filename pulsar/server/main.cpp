
// #include "server/server.h"
// #include "controllers/sitemap.h"
// #include "controllers/message.h"
// #include "controllers/mail.h"
#include <spdlog/spdlog.h>
#include <workflow/WFHttpServer.h>

int main(int argc, char *argv[]) {
#ifndef NDEBUG
    spdlog::set_level(spdlog::level::debug); // Set global log level to debug
#endif
    spdlog::debug("Hello, {}", "World!");

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


    WFHttpServer server([](WFHttpTask *task) {
        task->get_resp()->append_output_body("<html>Hello World!</html>");
    });

    if (server.start(8888) == 0) { // start server on port 8888
        getchar(); // press "Enter" to end.
        server.stop();
    }

    return 0;
}
