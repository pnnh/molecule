#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QKeyEvent>
#include "videoListModel.h"

int main(int argc, char *argv[]) {
  QGuiApplication app(argc, argv);
  qmlRegisterType<VideoListModel>("an.qt.CModel", 1, 0, "VideoListModel");

  QQmlApplicationEngine engine;
  const QUrl url(QStringLiteral("qrc:/pathview_simple.qml"));

  engine.load(url);

  if (engine.rootObjects().isEmpty())
    return -1;

  return app.exec();
}
