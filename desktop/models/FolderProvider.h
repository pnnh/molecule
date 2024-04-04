//
// Created by linyangz on 2023/2/11.
//

#ifndef MULTIVERSE_FOLDERPROVIDER_H
#define MULTIVERSE_FOLDERPROVIDER_H

#include <QDateTime>
#include <QString>
class FolderModel {};


namespace providers {
  typedef struct  //假定数据库存储内容
  {
    QString pk;
    QString path;
    int count;
    QString bookmark;

  } FolderInfo;

  QList<FolderInfo> SelectFolders();
}

#endif // MULTIVERSE_FOLDERPROVIDER_H
