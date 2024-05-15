#ifndef QT_EDITOR_SQLITE_H
#define QT_EDITOR_SQLITE_H

#include <QSqlDatabase>
#include <QString>
#include <QVariant>
#include <map>
#include <memory>

namespace services
{
	class SqlIterator
	{
	public:
		explicit SqlIterator(std::unique_ptr<QSqlQuery> query);
		// ~SqlIterator() = delete;
	        //SqlIterator() = delete;
		// SqlIterator(const SqlIterator&) = delete;
		// SqlIterator& operator=(const SqlIterator&) = delete;
		// // sql_iterator(sql_iterator&&) = delete;
		// SqlIterator& operator=(SqlIterator&&) = delete;

		[[nodiscard]] bool next() const;
		[[nodiscard]] QVariant value(int index) const;
		[[nodiscard]] QVariant value(const QString& name) const;
		[[nodiscard]] int column_count() const;
		[[nodiscard]] QString column_name(int index) const;

	private:
		std::unique_ptr<QSqlQuery> sqlQueryPtr;
	};

	class sqlite3_service
	{
	public:
		explicit sqlite3_service() = default;

		[[nodiscard]] static QString sql_version(const QString &dbPath);
		[[nodiscard]] static std::shared_ptr<SqlIterator> execute_query(
		  const QString& dbPath, const QString& sql_text,
		  const QMap<QString, QVariant> &parameters = QMap<QString, QVariant>());
	};
}

#endif // QT_EDITOR_SQLITE_H
