#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QtQuick/QQuickView>
#include <QtQml>
#include "ColorMaker.h"

int main(int argc, char *argv[]) {
  QGuiApplication app(argc, argv);
  QQmlApplicationEngine engine;

  qmlRegisterType<ColorMaker>("an.qt.ColorMaker", 1, 0, "ColorMaker");

  const QUrl url(QStringLiteral("qrc:/main.qml"));

  engine.load(url);

  if (engine.rootObjects().isEmpty())
    return -1;

  return app.exec();
}
