#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QtQml>
#include <QColor>

int main(int argc, char *argv[]) {
  QGuiApplication app(argc, argv);
  QQmlApplicationEngine engine;

  // qml文件名称，可以换成其它的qml文件查看不同布局定位器效果
  QString qmlName = "qrc:/flow.qml";

  const QUrl url(qmlName);

  engine.load(url);

  if (engine.rootObjects().isEmpty())
    return -1;

  return app.exec();
}
