#ifndef QT_EDITOR_SQLITE_H
#define QT_EDITOR_SQLITE_H

#include <QSqlDatabase>
#include <QString>
#include <QVariant>
#include <map>
#include <memory>

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
		explicit sqlite3_service() = default;

		[[nodiscard]] static QString sql_version(const QString &dbPath);
		[[nodiscard]] static std::shared_ptr<sql_iterator> execute_query(
		  const QString& dbPath, const QString& sql_text,
		  const QMap<QString, QVariant> &parameters = QMap<QString, QVariant>());
	};
}

#endif // QT_EDITOR_SQLITE_H
