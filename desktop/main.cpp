#include "services/SqliteService.h"
#include <QDebug>
#include <QGuiApplication>
#include <QLoggingCategory>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QQmlDebuggingEnabler>
#include <QQuickWindow>
#include <iostream>
#include <spdlog/spdlog.h>

#if TARGET_OS_MAC
#include "platform/macos/objc_code.h"
#elif _WIN32
#include <windows.h>
#include <consoleapi.h>
#endif
#include "services/SqliteService.h"

void sayHello()
{
  std::cout << "Hello, World!" << std::endl;
#if TARGET_OS_MAC
  std::cout << "macos call: " << localizedHostName().toStdString() << std::endl;
#endif
}

int main(int argc, char *argv[])
{
  QQmlDebuggingEnabler::enableDebugging(true);
  QLoggingCategory::defaultCategory()->setEnabled(QtDebugMsg, true);

  // #ifdef _WIN32
  //   if (AttachConsole(ATTACH_PARENT_PROCESS)) {
  //       freopen("CONOUT$", "w", stdout);
  //       freopen("CONOUT$", "w", stderr);
  //   }
  // #endif

  // #if defined(Q_OS_WIN)
  //   ::ShowWindow(::GetConsoleWindow(), SW_HIDE);
  // #endif

  // #ifdef _WIN32
  //     if (AttachConsole(ATTACH_PARENT_PROCESS) || AllocConsole()){
  //         FILE *stream1;
  //         freopen_s(&stream1, "CONOUT$", "w", stdout);
  //         freopen_s(&stream1, "CONOUT$", "w", stderr);
  //         freopen_s(&stream1, "CONIN$", "r", stdin);
  //     }
  // #endif

  spdlog::debug("i love c++1");
  spdlog::info("i love c++2");
  spdlog::error("i love c++3");
  qInfo() << "test info";
  qWarning() << "test warning";
  std::cerr << "Hello, World333333!" << std::endl;
  sayHello();
  qDebug() << "Hello, World444444!";

  QGuiApplication app(argc, argv);
  app.setApplicationDisplayName(QStringLiteral("This example is powered by qmltc!"));

  QQmlApplicationEngine engine;
  const QUrl url(QStringLiteral(u"qrc:/qt/qml/quick/content/Main.qml"));

  QObject::connect(&engine, &QQmlApplicationEngine::objectCreationFailed, &app, []()
                   { QCoreApplication::exit(-1); }, Qt::QueuedConnection);

  engine.load(url);

  if (engine.rootObjects().isEmpty())
    return -1;

  auto dbName = QGuiApplication::applicationDirPath() + "/venus22.sqlite";

  auto svc = std::make_shared<services::Sqlite3Service>(dbName);
  std::cout << "macos call: " << svc->sqlite3Version().toStdString() << std::endl;

  return app.exec();
}
