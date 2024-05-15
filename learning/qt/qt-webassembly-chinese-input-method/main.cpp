#include <QFontDatabase>
#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include "TextBalloon.h"

int main(int argc, char *argv[]) {
    QGuiApplication app(argc, argv);
    // 设置全局字体，用于解决Qt for WebAssembly中文显示异常问题
    // fileName 参数不用带qrc:前缀
    int fontId = QFontDatabase::addApplicationFont(
            ":/qt/qml/mymod/assets/fonts/NotoSansSC/NotoSansSC-Regular.otf");
    QStringList fontFamilies = QFontDatabase::applicationFontFamilies(fontId);
    qDebug() << "fontfamilies:" << fontFamilies;
    if (!fontFamilies.empty()) {
        QFont font;
        auto fontFamilie = fontFamilies[0];
        font.setFamily(fontFamilie); // 设置全局字体
        QGuiApplication::setFont(font);
    }
    QQmlApplicationEngine engine;
    QString strUrl{"qrc:/qt/qml/mymod/main.qml"};

    const QUrl url(strUrl);

    engine.load(url);

    if (engine.rootObjects().isEmpty())
        return -1;

    return QGuiApplication::exec();
}
