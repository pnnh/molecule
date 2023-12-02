//
// Created by linyangz on 2021/12/19.
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
#include <iostream>
#include <QTextStream>

const QString TableFolders = "folders";
 
services::Sqlite3Service::Sqlite3Service(QString fullPath) {

  QSqlDatabase database;
  if (QSqlDatabase::contains(this->dbPath)) {
    database = QSqlDatabase::database(this->dbPath);
  } else {
    database = QSqlDatabase::addDatabase("QSQLITE", this -> dbPath);
    auto dbFullPath = QApplication::applicationDirPath() + this->dbPath;
    qDebug() << "数据库目录：" << dbFullPath << Qt::endl;
    database.setDatabaseName(dbFullPath);
    database.setUserName("venus");
    database.setPassword("123456");
  }

  if (!database.open()) {
    throw business::AppException("Error: Failed to connect database.", database.lastError().databaseText());
  }
 
  QSqlQuery query;
  // 判断表是否已经存在
  QString sql = QString("select * from sqlite_master where name='%1'").arg(TableFolders);
  if (!query.exec(sql)) {
    throw business::AppException("检查表是否存在出错");
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
      throw business::AppException("创建表出错");
    }
  }
  this->sqldb = database;
}

QString services::Sqlite3Service::sqlite3Version() {
  QSqlQuery versionQuery{this->sqldb};
  versionQuery.exec("select sqlite_version();");
  versionQuery.next();
  QString sqliteVersion = versionQuery.value("sqlite_version()").toString();
  versionQuery.finish();
  QString outVersion; 
  QTextStream out(&outVersion);
  out << sqliteVersion;
  return outVersion;
}

services::Sqlite3Service::~Sqlite3Service() {
  this->sqldb.close();
}

std::shared_ptr<QSqlQuery> services::Sqlite3Service::query(QString sqlText) {
  auto query = std::make_shared<QSqlQuery>(this->sqldb);
  query->prepare(sqlText);
  if (!query->exec(sqlText)) {
    throw business::AppException("Sqlite3Service::query出错: " +
                                 query->lastError().text());
  }
  return query;
}