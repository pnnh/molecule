#include "PictureGridModel.h"

#include <QDebug>
#include <QDir>
#include <QDirIterator>
#include <QStringView>
#include <QVector>

PictureGridModel::PictureGridModel(QObject *parent)
    : QAbstractListModel(parent) {
  int role = Qt::UserRole;
  dataNames.insert(role++, "picSrc");
}

PictureGridModel::~PictureGridModel() { clear(); }

int PictureGridModel::rowCount(const QModelIndex &parent) const {
  return dataList.size();
}

QVariant PictureGridModel::data(const QModelIndex &index, int role) const {
  QVector<QString> *d = dataList[index.row()];
  return d->at(role - Qt::UserRole);
}

QHash<int, QByteArray> PictureGridModel::roleNames() const { return dataNames; }

void PictureGridModel::reload(const QString &path) {
  beginResetModel();
  reset();
  load(path);
  endResetModel();
}

void PictureGridModel::remove(int index) {
  beginRemoveRows(QModelIndex(), index, index);
  delete dataList.takeAt(index);
  endRemoveRows();
}

void PictureGridModel::load(const QString &path) {
  qInfo() << "Load====================================: " << path;
  // QString path = "/Users/linyangz/Projects/github/emotion-desktop/data";
  QDir dir(path);
  if (!dir.exists()) {
    qInfo() << "dir is null";
    return;
  }
  // 设置过滤器
  dir.setFilter(QDir::Files | QDir::NoDotAndDotDot);
  dir.setSorting(QDir::Name | QDir::IgnoreCase); // 按照名称排序
  QDirIterator iterator(dir);
  while (iterator.hasNext()) {
    // qInfo() << "iterator.fileName = " << iterator.fileName();
    QFileInfo info(iterator.next());
    QString name = info.fileName();     // 获取文件名
    QString fileName = info.filePath(); // 文件目录+文件名
    // qInfo() << "fileName = " << fileName;
    //  XXX

    if (!fileName.isEmpty() && !fileName.isNull()) {
      auto video = new QVector<QString>();
      video->append("file:" + fileName);
      dataList.append(video);
    }

    // iterator.next();
  }
  qInfo() << "files count = " << dataList.size();

  //  QString elementName;
  //  int count = 10;
  //  while (count-- > 0) {
  //    QString path = "file:assets/images/data/1.png";
  //    auto video = new QVector<QString>();
  //    video->append(path);
  //    m_videos.append(video);
  //  }
}

void PictureGridModel::reset() { clear(); }

void PictureGridModel::clear() {
  int count = dataList.size();
  if (count > 0) {
    for (int i = 0; i < count; i++) {
      delete dataList.at(i);
    }
    dataList.clear();
  }
}
