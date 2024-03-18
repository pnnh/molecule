//
// Created by linyangz on 2022/1/31.
//

#include "sqliteModel.h"
#include "sqlite/sqlite.h"

sqliteModel::sqliteModel(QObject *parent) {

}
sqliteModel::~sqliteModel() {

}

QVariantMap sqliteModel::getTask(QString pk) {
  qDebug() << "getTask" << pk;
  auto task = sqlite::getTask(pk);
  QVariantMap result;
  result["pk"] = task.pk;
  result["title"] = task.title;
  result["body"] = task.body;

  return result;
}

void sqliteModel::updateTaskBody(QString pk, QString body) {
  qDebug() << "updateTaskBody" << pk << "|" << body;
  sqlite::updateBody(pk, body);
}
