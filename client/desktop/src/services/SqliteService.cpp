//
// Created by Larry on 2021/12/19.
//

#include "SqliteService.h"
#include "business/AppException.h"
#include <QDateTime>
#include <QSqlError>
#include <QUuid>
#include <QtSql/QSqlDatabase>
#include <QtSql/QSqlQuery>
#include <QtSql/QSqlRecord>
#include <QtWidgets/QApplication>

const QString TableFolders = "folders";

void services::initSqlite() {
  QSqlDatabase db = QSqlDatabase::addDatabase("QSQLITE");

  auto dbName = QApplication::applicationDirPath() + "/multiverse.sqlite";
  qDebug() << "数据库目录：" << dbName << Qt::endl;
  db.setDatabaseName(dbName);
  if (!db.open()) {
    qDebug() << "打开数据库文件出错: " << db.lastError().text();
    throw business::AppException("打开数据库文件出错: " +
                                 db.lastError().text());
  }

  QSqlQuery query; // 执行操作类对象

  // 判断表是否已经存在
  QString sql =
      QString("select * from sqlite_master where name='%1'").arg(TableFolders);
  if (!query.exec(sql)) {
    throw business::AppException("检查表是否存在出错: " +
                                 db.lastError().text());
  }
  QString columnName;
  if (query.next()) {
    columnName = query.value("name").toString();
  }
  if (columnName != TableFolders) {
    auto createSql = QString("CREATE TABLE %1("
                             "pk VARCHAR PRIMARY KEY NOT NULL,"
                             "path VARCHAR NOT NULL,"
                             "count integer NOT NULL,"
                             "bookmark VARCHAR)")
                         .arg(TableFolders);
    if (!query.exec(createSql)) {
      throw business::AppException("创建表出错: " + db.lastError().text());
    }
  }
}
