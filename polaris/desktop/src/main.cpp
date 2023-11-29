#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include "utils/md5.h"
#include "models/videoListModel.h"
#include "models/sqliteModel.h"

int main(int argc, char *argv[]) {
  QGuiApplication app(argc, argv);
  qmlRegisterType<VideoListModel>("an.qt.CModel", 1, 0, "VideoListModel");

  QQmlApplicationEngine engine;
  const QUrl url(QStringLiteral(u"qrc:/qt/qml/quick/module/Main.qml"));

  engine.rootContext()->setContextProperty("sqlite", new sqliteModel());

  engine.load(url);

  if (engine.rootObjects().isEmpty())
    return -1;

  return app.exec();
}

