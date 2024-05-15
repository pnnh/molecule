//
// Created by Larry on 2024/5/8.
//

#include "SyncService.h"

#include "UserService.h"
#include "utils/base32.h"

#include <QUuid>
#include <iostream>
#include <models/library_model.h>
#include <qdir.h>
#include <qdiriterator.h>

void SyncService::SyncLibraries() {
  auto appDir = UserService::EnsureApplicationDirectory("/Polaris/Data");
  QDir dir(appDir);
  if (!dir.exists()) {
    std::cerr << "应用主目录不存在无法同步" << std::endl;
    return;
  }
  // 设置过滤器
  dir.setFilter(QDir::Dirs | QDir::NoDotAndDotDot);
  dir.setSorting(QDir::Name | QDir::IgnoreCase); // 按照名称排序
  QDirIterator iterator(dir);
  QVector<LibraryModel> libraryList;
  while (iterator.hasNext()) {
    QFileInfo info(iterator.next());
    QString fileName = info.fileName(); // 获取文件名
    QString filePath = info.filePath(); // 文件目录+文件名

    if (!filePath.isEmpty() && !filePath.isNull()) {
      if (fileName == "Index.db" || !fileName.endsWith(".vslibrary")) {
        continue;
      }
      auto uid =
          Base32Encoder::Encode(filePath); // QUuid::createUuid().toString();
      auto model = LibraryModel{.uid = uid, .name = fileName, .path = filePath};
      libraryList.push_back(model);
    }
  }
  std::cout << "SyncLibraries: " << libraryList.size() << std::endl;
  libraryService.InsertOrUpdateLibrary(libraryList);
}
