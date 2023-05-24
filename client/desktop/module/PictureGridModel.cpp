//
// Created by Larry on 2021/11/25.
//

#include "PictureGridModel.h"

#include <QDebug>
#include <QDir>
#include <QDirIterator>
#include <QStringView>
#include <QVector>

PictureGridModel::PictureGridModel(QObject *parent)
    : QAbstractListModel(parent), m_bError(false) {
  int role = Qt::UserRole;
  // m_roleNames.insert(role++, "key");
  m_roleNames.insert(role++, "picSrc");
}
PictureGridModel::~PictureGridModel() { clear(); }
int PictureGridModel::rowCount(const QModelIndex &parent) const {
  return m_videos.size();
}
QVariant PictureGridModel::data(const QModelIndex &index, int role) const {
  QVector<QString> *d = m_videos[index.row()];
  return d->at(role - Qt::UserRole);
}
QHash<int, QByteArray> PictureGridModel::roleNames() const {
  return m_roleNames;
}
QString PictureGridModel::source() const { return m_strXmlFile; }
void PictureGridModel::setSource(const QString &filePath) {
  m_strXmlFile = filePath;
  reload(filePath);
  if (m_bError) {
    qDebug() << "VideoListModel, error - " << m_strError;
  }
}
QString PictureGridModel::errorString() const { return m_strError; }
bool PictureGridModel::hasError() const { return m_bError; }
void PictureGridModel::reload(const QString &path) {
  beginResetModel();
  reset();
  load(path);
  endResetModel();
}
void PictureGridModel::remove(int index) {
  beginRemoveRows(QModelIndex(), index, index);
  delete m_videos.takeAt(index);
  endRemoveRows();
}

void PictureGridModel::load(const QString &path) {
  qInfo() << "Load====================================: " << path;
  // QString path = "/Users/Larry/Projects/github/emotion-desktop/data";
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
      m_videos.append(video);
    }

    // iterator.next();
  }
  qInfo() << "files count = " << m_videos.size();

  //  QString elementName;
  //  int count = 10;
  //  while (count-- > 0) {
  //    QString path = "file:assets/images/data/1.png";
  //    auto video = new QVector<QString>();
  //    video->append(path);
  //    m_videos.append(video);
  //  }
}
void PictureGridModel::reset() {
  m_bError = false;
  m_strError.clear();
  clear();
}
void PictureGridModel::clear() {
  int count = m_videos.size();
  if (count > 0) {
    for (int i = 0; i < count; i++) {
      delete m_videos.at(i);
    }
    m_videos.clear();
  }
}
