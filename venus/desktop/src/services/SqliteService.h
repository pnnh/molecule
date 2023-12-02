//
// Created by linyangz on 2021/12/19.
//

#ifndef QT_EDITOR_SQLITE_H
#define QT_EDITOR_SQLITE_H

#include <QDateTime>
#include <QString>
#include <QSqlDatabase>

namespace services {
  class Sqlite3Service {
  public:
    Sqlite3Service(QString fullPath);
    ~Sqlite3Service();

  QString sqlite3Version();
  std::shared_ptr<QSqlQuery> query(QString sqlText);

  private:
    QString dbPath;
    QSqlDatabase sqldb;
  };
}

#endif // QT_EDITOR_SQLITE_H
