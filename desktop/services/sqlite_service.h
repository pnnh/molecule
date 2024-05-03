#ifndef QT_EDITOR_SQLITE_H
#define QT_EDITOR_SQLITE_H

#include <memory>
#include <QString>
#include <QSqlDatabase>

namespace services
{
	class sql_iterator
	{
	public:
		explicit sql_iterator(QSqlQuery& query);
		~sql_iterator();
		sql_iterator(const sql_iterator&) = delete;
		sql_iterator& operator=(const sql_iterator&) = delete;
		sql_iterator(sql_iterator&&) = delete;
		sql_iterator& operator=(sql_iterator&&) = delete;

		[[nodiscard]] bool next() const;
		[[nodiscard]] QVariant value(int index) const;
		[[nodiscard]] QVariant value(const QString& name) const;
		[[nodiscard]] int column_count() const;
		[[nodiscard]] QString column_name(int index) const;

	private:
		QSqlQuery& sql_query_;
	};

	class sqlite3_service
	{
	public:
		explicit sqlite3_service(const QString& full_path);
		~sqlite3_service();
		sqlite3_service(const sqlite3_service&) = delete;
		sqlite3_service& operator=(const sqlite3_service&) = delete;
		sqlite3_service(sqlite3_service&&) = delete;
		sqlite3_service& operator=(sqlite3_service&&) = delete;

		[[nodiscard]] QString sql_version() const;
		[[nodiscard]] std::shared_ptr<sql_iterator> execute_query(const QString& sql_text) const;

	private:
		QString db_path_;
		QSqlDatabase sql_database_;
	};
}

#endif // QT_EDITOR_SQLITE_H
