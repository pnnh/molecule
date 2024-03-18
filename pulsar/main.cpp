
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QtWidgets>
#include <QQuickView>
#include <QUrl>
#include "macos/macwindow.h"
#include "utils/md5.h"
#include "models/videoListModel.h"

void showWindow() {
    auto contentWindow = new QQuickView();
    const QUrl url(QStringLiteral(u"qrc:/qt/qml/quick/content/App.qml"));
    contentWindow->setSource(url);
    contentWindow->setResizeMode(QQuickView::SizeRootObjectToView);

    auto *macWindow = new MacWindow(contentWindow);

    macWindow->show();
    contentWindow->show();
}

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);
    qmlRegisterType<VideoListModel>("an.qt.CModel", 1, 0, "VideoListModel");

    showWindow();

    return QApplication::exec();
}

