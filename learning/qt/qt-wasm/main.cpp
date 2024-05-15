#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QFontDatabase>

int main(int argc, char *argv[]) {
  QGuiApplication app(argc, argv);

  // 设置全局字体，用于解决Qt for WebAssembly中文显示异常问题
  // fileName 参数不用带qrc:前缀
  int fontId = QFontDatabase::addApplicationFont(":/qt/qml/qtwasm/qrc/ZhiMangXing-Regular.ttf");
  QStringList fontFamilies = QFontDatabase::applicationFontFamilies(fontId);
  qDebug()<<"fontfamilies:"<<fontFamilies;
  if (fontFamilies.size() > 0)
  {
    QFont font;
    auto fontFamilie = fontFamilies[0];
    font.setFamily(fontFamilie);//设置全局字体
    app.setFont(font);
  }

  QQmlApplicationEngine engine;
  const QUrl url(QStringLiteral("qrc:/qt/qml/qtwasm/qrc/Main.qml"));

  engine.load(url);

  if (engine.rootObjects().isEmpty())
    return -1;

  return app.exec();
}

