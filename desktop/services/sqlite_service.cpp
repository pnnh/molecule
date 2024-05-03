#include "sqlite_service.h"
#include "models/AppException.h"
#include <QDateTime>
#include <QSqlError>
#include <QUuid>
#include <QtSql/QSqlDatabase>
#include <QtSql/QSqlQuery>
#include <QtSql/QSqlRecord>
#include <QtWidgets/QApplication>
#include <iostream>
#include <QTextStream>

services::sql_iterator::sql_iterator(QSqlQuery& query) : sql_query_(query)
{
}

services::sql_iterator::~sql_iterator()
= default;

bool services::sql_iterator::next() const
{
	return sql_query_.next();
}

QVariant services::sql_iterator::value(const int index) const
{
	return sql_query_.value(index).toString();
}

QVariant services::sql_iterator::value(const QString& name) const
{
	return sql_query_.value(name).toString();
}

int services::sql_iterator::column_count() const
{
	return sql_query_.record().count();
}

QString services::sql_iterator::column_name(const int index) const
{
	return sql_query_.record().fieldName(index);
}

services::sqlite3_service::sqlite3_service(const QString& full_path)
{
	this->db_path_ = full_path;

	/*if (db_path_ == "")
	{
		this->db_path_ = QApplication::applicationDirPath() + "/venus.sqlite";
	}
	else if (!db_path_.startsWith("/"))
	{
		this->db_path_ = QApplication::applicationDirPath() + "/" + db_path_;
	}*/
	qDebug() << "数据库目录：" << this->db_path_ << Qt::endl;

	QSqlDatabase database;
	if (QSqlDatabase::contains(this->db_path_))
	{
		database = QSqlDatabase::database(this->db_path_);
	}
	else
	{
		database = QSqlDatabase::addDatabase("QSQLITE", this->db_path_);
		database.setDatabaseName(this->db_path_);
	}

	if (!database.open())
	{
		throw business::AppException("Error: Failed to connect database.", database.lastError().databaseText());
	}

	auto query = std::make_shared<QSqlQuery>(database);

	auto createSql = QString("CREATE TABLE IF NOT EXISTS libraries("
		"uid VARCHAR PRIMARY KEY NOT NULL,"
		"name VARCHAR NOT NULL)");
	if (!query->exec(createSql))
	{
		throw business::AppException("创建表出错");
	}
	this->sql_database_ = database;
}

QString services::sqlite3_service::sql_version() const
{
	QSqlQuery versionQuery{this->sql_database_};
	versionQuery.exec("select sqlite_version();");
	versionQuery.next();
	QString sqliteVersion = versionQuery.value("sqlite_version()").toString();
	versionQuery.finish();
	QString outVersion;
	QTextStream out(&outVersion);
	out << sqliteVersion;
	return outVersion;
}

services::sqlite3_service::~sqlite3_service()
{
	this->sql_database_.close();
}

std::shared_ptr<services::sql_iterator> services::sqlite3_service::execute_query(const QString& sql_text) const
{
	auto query = QSqlQuery(this->sql_database_);
	query.prepare(sql_text);
	if (!query.exec(sql_text))
	{
		throw business::AppException("Sqlite3Service::query出错: " + query.lastError().text());
	}
	auto sqlIterator = std::make_shared<sql_iterator>(query);
	return sqlIterator;
}

//std::shared_ptr<services::Sqlite3Service> services::getSqlite3Service(QString dbPath) {
//  auto dbFullPath = dbPath;
//  if (dbPath == "") {
//    dbFullPath = QApplication::applicationDirPath() + "/venus.sqlite";
//  } else if (!dbPath.startsWith("/")) {
//    dbFullPath = QApplication::applicationDirPath() + "/" + dbPath;
//  }
//  qDebug() << "数据库目录：" << dbFullPath << Qt::endl;
//  
//  return std::make_shared<Sqlite3Service>(dbFullPath);
//}
