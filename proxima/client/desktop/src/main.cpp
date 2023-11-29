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
  const QUrl url(QStringLiteral("qrc:/quick/module/views/Main.qml"));

  engine.load(url);

  if (engine.rootObjects().isEmpty())
    return -1;

  return app.exec();
}
