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

const QString TableFolders = "folders";

void services::initSqlite() {
  QSqlDatabase db = QSqlDatabase::addDatabase("QSQLITE");

  auto dbName = QApplication::applicationDirPath() + "/venus.sqlite";
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

services::Sqlite3Service::Sqlite3Service(QString fullPath) {
  char* zErrMsg = 0;
  int rc;

  rc = sqlite3_open(fullPath.toStdString().c_str(), &sqldb);  /* open database */
  if (rc) {
    QString message ="无法打开数据库: ";
    message.append(sqlite3_errmsg(sqldb));
    throw business::AppException(message);
  }
  char* sqlText = "select 1990 as num, 'hello世界' as title;";

  char** pResult;
  int nRow;
  int nCol;
  rc = sqlite3_get_table(sqldb,sqlText,&pResult,&nRow,&nCol,&zErrMsg);
  if (rc != SQLITE_OK)
  {
    QString message ="SQL error: ";
    message.append(zErrMsg);
    sqlite3_free(zErrMsg);
    throw business::AppException(message);
  }

  std::string strOut;
  int nIndex = nCol;
  for(int i=0;i<nRow;i++)
  {
    for(int j=0;j<nCol;j++)
    {
      strOut+=pResult[j];
      strOut+=":";
      strOut+=pResult[nIndex];
      strOut+="\n";
      ++nIndex;
    }
  }
  sqlite3_free_table(pResult);  //使用完后务必释放为记录分配的内存，否则会内存泄漏
  std::cout<<strOut<<std::endl;
}

services::Sqlite3Service::~Sqlite3Service() {
  if (sqldb != nullptr) {
    sqlite3_close(sqldb);
  }
}