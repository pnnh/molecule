//
// Created by Larry on 2022/11/4.
//

#include "helper.h"
#include <QDebug>
#include <QDir>
#include <QDirIterator>
#include <QImage>

void Helper::Process(const QString &path) {
  qInfo() << "Load====================================: " << path;
  //QString path = "/Users/Larry/Projects/github/emotion-desktop/data";
  QDir dir(path);
  if (!dir.exists()) {
    qInfo() << "dir is null";
    return;
  }
//设置过滤器
  dir.setFilter(QDir::Files | QDir::NoDotAndDotDot);
  dir.setSorting(QDir::Name | QDir::IgnoreCase); //按照名称排序
  QDirIterator iterator(dir);
  int imageFileCount = 0, allFileCount = 0;
  while (iterator.hasNext()) {
    allFileCount += 1;
    QFileInfo fileInfo(iterator.next());
    QString name = fileInfo.fileName(); //获取文件名
    QString filePath = fileInfo.filePath(); //文件目录+文件名
    QString fileExt = fileInfo.completeSuffix().toLower();
    qInfo() << "filePath = " << filePath << "fileExt: " << fileInfo.completeSuffix();
    if (fileExt == "jpg" || fileExt == "jpeg" || fileExt == "png" || fileExt == "webp") {
      imageFileCount += 1;
      if (!filePath.isEmpty() && !filePath.isNull()) {
        qDebug() << "filePath: " << filePath ;
        convert(fileInfo);
      }
    }
  }
  qInfo() << "allFileCount: " << allFileCount << "\nimageFileCount: " << imageFileCount;

}


void Helper::convert(const QFileInfo &fileInfo) {
  QString fileName = fileInfo.fileName();
  QString baseName = fileInfo.baseName();
  QString filePath = fileInfo.filePath();
  QString canonicalPath = fileInfo.canonicalPath();
  QString fileExt = fileInfo.completeSuffix().toLower();

  QImage image(filePath);
  //auto scaled_image = image.scaled(36, 36, Qt::KeepAspectRatio);
  auto scaled_path = canonicalPath + "/" + baseName + "_36.gif";
  qDebug() << "scaled_path: " << scaled_path;
  //scaled_image.save(scaled_path, "png");
  int dotsPerMeterX = 70 / 0.0254;
  int dotsPerMeterY = 70 / 0.0254;
  image.setDotsPerMeterX(dotsPerMeterX);
  image.setDotsPerMeterY(dotsPerMeterY);
  image.save(scaled_path, "png");
}