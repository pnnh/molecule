#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QtQml>
#include <QColor>

int main(int argc, char *argv[]) {
  QGuiApplication app(argc, argv);
  QQmlApplicationEngine engine;

  QString qmlName = "qrc:/qt_create_component.qml";

  const QUrl url(qmlName);

  engine.load(url);

  if (engine.rootObjects().isEmpty())
    return -1;

  return app.exec();
}
