#include "app.h"
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QtWidgets>
#include <QQuickView>
#include <QUrl>
#include <QDebug>

#include "macos/macwindow.h"
#include "utils/md5.h"
#include "models/videoListModel.h"
#include "models/sqliteModel.h"


void showWindow() {

    auto contentWindow = new QQuickView();
    const QUrl url(QStringLiteral(u"qrc:/qt/qml/quick/content/test.qml"));
    contentWindow->setSource(url);
    contentWindow->setResizeMode(QQuickView::SizeRootObjectToView);
    contentWindow->resize(400, 400);

    MacWindow *macWindow = new MacWindow(contentWindow);

    macWindow->show();
    contentWindow->show();
}

int runApp(int argc, char *argv[]) {
    QApplication app(argc, argv);
    //qmlRegisterType<VideoListModel>("an.qt.CModel", 1, 0, "VideoListModel");

//    QQmlApplicationEngine engine;
//    const QUrl url(QStringLiteral(u"qrc:/qt/qml/quick/src/module/Main.qml"));
//
//    engine.rootContext()->setContextProperty("sqlite", new sqliteModel());
//
//    engine.load(url);
//
//    if (engine.rootObjects().isEmpty())
//        return -1;
    showWindow();

//    QTimer::singleShot(200, []() {
//        showWindow();
//    });

    //app.connect(&app, SIGNAL(lastWindowClosed()), &app, SLOT(quit()));  // 该行似乎没有效果

    return app.exec();
}

