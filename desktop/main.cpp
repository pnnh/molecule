#include "tests/tests.h"
#include "threads/SyncThread.h"
#include <QLoggingCategory>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QQmlDebuggingEnabler>
#include <QQuickWindow>
#include <iostream>
#include <spdlog/spdlog.h>

#if _WIN32

#include <windows.h>

#endif

int main(int argc, char *argv[]) {
  QQmlDebuggingEnabler::enableDebugging(true);
  QLoggingCategory::defaultCategory()->setEnabled(QtDebugMsg, true);

  spdlog::debug("i love c++1");
  spdlog::info("i love c++2");
  spdlog::error("i love c++3");
  qInfo() << "test info";
  qWarning() << "test warning";
  std::cerr << "Hello, World333333!" << std::endl;
  qDebug() << "Hello, World444444!";

  QGuiApplication app(argc, argv);
  QGuiApplication::setApplicationDisplayName(
      QStringLiteral("This example is powered by qmltc!"));

  // 执行单元测试用例
  if (argc == 2) {
    if (strcmp(argv[1], "sqlite") == 0)
      return TestSqliteVersion();
    if (strcmp(argv[1], "markdown") == 0)
      return TestMarkdown();
  }

  QQmlApplicationEngine engine;
  const QUrl url(QStringLiteral(u"qrc:/qt/qml/quick/content/Main.qml"));

  QObject::connect(
      &engine, &QQmlApplicationEngine::objectCreationFailed, &app,
      []() { QCoreApplication::exit(-1); }, Qt::QueuedConnection);

  engine.load(url);

  if (engine.rootObjects().isEmpty())
    return -1;

  // 启动同步服务
  SyncThread syncThread;
  syncThread.start();

  return QGuiApplication::exec();
}