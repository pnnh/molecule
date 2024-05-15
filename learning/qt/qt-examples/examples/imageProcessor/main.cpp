#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QtQml>
#include <QColor>
#include "imageProcessor.h"

int main(int argc, char *argv[]) {
  QGuiApplication app(argc, argv);
  QQmlApplicationEngine engine;

  qmlRegisterType<ImageProcessor>("an.qt.ImageProcessor", 1, 0, "ImageProcessor");

  const QUrl url(QStringLiteral("qrc:/main.qml"));

  engine.load(url);

  if (engine.rootObjects().isEmpty())
    return -1;

  return app.exec();
}
