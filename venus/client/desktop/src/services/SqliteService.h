//
// Created by linyangz on 2021/12/19.
//

#ifndef QT_EDITOR_SQLITE_H
#define QT_EDITOR_SQLITE_H

#include <QDateTime>
#include <QString>
#include "sqlite3.h"

namespace services {
void initSqlite();


  class Sqlite3Service {

  public:
    Sqlite3Service(QString fullPath);
    ~Sqlite3Service();

  private:
    sqlite3* sqldb;
  };
}

#endif // QT_EDITOR_SQLITE_H
