#include "services/SqliteService.h"
#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QQmlDebuggingEnabler>
#include <QQuickWindow>
#include <iostream>
#include "sqlite3.h"
#include "macos/objc_code.h"
#include "services/SqliteService.h"


int main(int argc, char *argv[]) {
  QQmlDebuggingEnabler::enableDebugging(true);

  QGuiApplication app(argc, argv);
  app.setApplicationDisplayName(
      QStringLiteral("This example is powered by qmltc!"));

  services::initSqlite();

  QQmlApplicationEngine engine;
  //const QUrl url(QStringLiteral("qrc:/quick/module/views/Main.qml"));
  const QUrl url(QStringLiteral(u"qrc:/qt/qml/quick/module/views/Main.qml"));

  //:/qt/qml/

  QObject::connect(&engine, &QQmlApplicationEngine::objectCreationFailed,
      &app, []() { QCoreApplication::exit(-1); },
      Qt::QueuedConnection);

  engine.load(url);

  std::cout << "sqlite3 version: " << sqlite3_libversion() << std::endl;

  auto dbName = QGuiApplication::applicationDirPath() + "/venus22.sqlite";

  auto svc = new services::Sqlite3Service(dbName);


  std::cout << "macos call: " << localizedHostName().toStdString() << std::endl;


  return app.exec();
}
