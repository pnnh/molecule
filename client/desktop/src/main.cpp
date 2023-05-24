#include "services/SqliteService.h"
#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QQmlDebuggingEnabler>
#include <QQuickWindow>

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

//  if (engine.rootObjects().isEmpty())
//    return -1;

  return app.exec();
}
