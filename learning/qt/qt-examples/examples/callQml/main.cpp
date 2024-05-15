#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QtQml>
#include <QMetaObject>
#include <QColor>
#include "changeColor.h"


int main(int argc, char *argv[]) {
  QGuiApplication app(argc, argv);
  QQmlApplicationEngine engine;

  const QUrl url(QStringLiteral("qrc:/main.qml"));

  engine.load(url);

  if (engine.rootObjects().isEmpty())
    return -1;

  QObject *root = NULL;
  QList<QObject*> rootObjects = engine.rootObjects();
  int count = rootObjects.size();
  for (int i = 0; i < count;i++) {
      if (rootObjects.at(i) -> objectName() == "rootObject") {
          root = rootObjects.at(i);
          break;
      }
  }
  new ChangeQmlColor(root);
  QObject * quitButton = root->findChild<QObject*>("quitButton");
  if (quitButton) {
      QObject::connect(quitButton, SIGNAL(clicked()), &app, SLOT(quit()));
  }
  QObject *textLabel = root->findChild<QObject*>("textLabel");
  if (textLabel) {
      textLabel->setProperty("text", "hi, bingo");
      textLabel->setProperty("color", QColor::fromRgb(255, 0,0));
  }

  return app.exec();
}
