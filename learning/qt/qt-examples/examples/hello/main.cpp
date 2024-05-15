#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QFontDatabase>
#include "voronoi.h"

int main(int argc, char *argv[]) {
  QGuiApplication app(argc, argv);

  // 设置全局字体，演示目的
  int fontId = QFontDatabase::addApplicationFont(":/ZhiMangXing-Regular.ttf");
  QStringList fontFamilies = QFontDatabase::applicationFontFamilies(fontId);
  qDebug() << "fontfamilies:" << fontFamilies;
  if (fontFamilies.size() > 0) {
    QFont font;
    auto fontFamilie = fontFamilies[0];
    font.setFamily(fontFamilie);//设置全局字体
    app.setFont(font);
  }

  QQmlApplicationEngine engine;
  const QUrl url(QStringLiteral("qrc:/main.qml"));
  QObject::connect(&engine, &QQmlApplicationEngine::objectCreated,
                   &app, [url](QObject *obj, const QUrl &objUrl) {
        if (!obj && url == objUrl)
          QCoreApplication::exit(-1);
      }, Qt::QueuedConnection);
  engine.load(url);

  QScopedPointer<Voronoi> voronoi(new Voronoi);
  //voronoi.data()指向智能指针中的类对象，如果voronoi是一个普通指针，则voronoi.data()改为voronoi即可
  engine.rootContext()->setContextProperty("voronoi", voronoi.data());

  if (engine.rootObjects().isEmpty())
    return -1;

  return app.exec();
}
