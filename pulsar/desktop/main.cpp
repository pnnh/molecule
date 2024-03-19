#include "services/SqliteService.h"
#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QQmlDebuggingEnabler>
#include <QQuickWindow>
#include <iostream>
#if TARGET_OS_MAC
  #include "macos/objc_code.h"
#endif
#include "services/SqliteService.h"

int main(int argc, char *argv[]) {
  QQmlDebuggingEnabler::enableDebugging(true);

  QGuiApplication app(argc, argv);
  app.setApplicationDisplayName(
      QStringLiteral("This example is powered by qmltc!"));

  QQmlApplicationEngine engine;
  const QUrl url(QStringLiteral(u"qrc:/qt/qml/quick/src/module/views/Main.qml"));

  // QObject::connect(&engine, &QQmlApplicationEngine::objectCreationFailed,
  //     &app, []() { QCoreApplication::exit(-1); },
  //     Qt::QueuedConnection);

  engine.load(url);

  auto dbName = QGuiApplication::applicationDirPath() + "/venus22.sqlite";

  auto svc = std::make_shared<services::Sqlite3Service>(dbName);
  std::cout << "macos call: " << svc -> sqlite3Version().toStdString() << std::endl;

  return app.exec();
}


void sayHello() {
  std::cout << "Hello, World!" << std::endl;
  #if TARGET_OS_MAC
    std::cout << "macos call: " << localizedHostName().toStdString() << std::endl;
  #endif
}