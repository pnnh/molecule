#include "sqlite_service.h"
#include <QDateTime>
#include <QSqlError>
#include <QTextStream>
#include <QUuid>
#include <QtSql/QSqlDatabase>
#include <QtSql/QSqlQuery>
#include <QtSql/QSqlRecord>
#include <QtWidgets/QApplication>
#include <iostream>

services::sql_iterator::sql_iterator(QSqlQuery &query) : sql_query_(query) {}

services::sql_iterator::~sql_iterator() = default;

bool services::sql_iterator::next() const { return sql_query_.next(); }

QVariant services::sql_iterator::value(const int index) const {
  return sql_query_.value(index).toString();
}

QVariant services::sql_iterator::value(const QString &name) const {
  return sql_query_.value(name).toString();
}

int services::sql_iterator::column_count() const {
  return sql_query_.record().count();
}

QString services::sql_iterator::column_name(const int index) const {
  return sql_query_.record().fieldName(index);
}

QSqlDatabase getDatabase(const QString &dbPath) {
  QSqlDatabase database;
  if (QSqlDatabase::contains(dbPath)) {
    database = QSqlDatabase::database(dbPath);
  } else {
    database = QSqlDatabase::addDatabase("QSQLITE", dbPath);
    database.setDatabaseName(dbPath);
  }
  if (!database.open()) {
    throw std::runtime_error("Error: Failed to connect database." +
                             database.lastError().databaseText().toStdString());
  }
  return database;
}

QString services::sqlite3_service::sql_version(const QString &dbPath) {
  auto database = getDatabase(dbPath);
  QSqlQuery versionQuery{database};
  versionQuery.exec("select sqlite_version();");
  versionQuery.next();
  QString sqliteVersion = versionQuery.value("sqlite_version()").toString();
  versionQuery.finish();
  QString outVersion;
  QTextStream out(&outVersion);
  out << sqliteVersion;
  return outVersion;
}

std::shared_ptr<services::sql_iterator>
services::sqlite3_service::execute_query(
    const QString &dbPath, const QString &sql_text,
    const QMap<QString, QVariant> &parameters) {
  QSqlDatabase database = getDatabase(dbPath);

  auto query = QSqlQuery(database);

  if (!query.prepare(sql_text)) {
    throw std::runtime_error("Sqlite3Service::query出错: " +
                             query.lastError().text().toStdString());
  }

  for (const auto &each : parameters.toStdMap()) {
    query.bindValue(each.first, each.second);
  }

  if (!query.exec()) {
    throw std::runtime_error("Sqlite3Service::query出错2: " +
                             query.lastError().text().toStdString());
  }
  auto sqlIterator = std::make_shared<sql_iterator>(query);
  return sqlIterator;
}

// std::shared_ptr<services::Sqlite3Service> services::getSqlite3Service(QString
// dbPath) {
//   auto dbFullPath = dbPath;
//   if (dbPath == "") {
//     dbFullPath = QApplication::applicationDirPath() + "/venus.sqlite";
//   } else if (!dbPath.startsWith("/")) {
//     dbFullPath = QApplication::applicationDirPath() + "/" + dbPath;
//   }
//   qDebug() << "数据库目录：" << dbFullPath << Qt::endl;
//
//   return std::make_shared<Sqlite3Service>(dbFullPath);
// }
