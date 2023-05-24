//
// Created by Larry on 2022/10/14.
//

#include "FolderListModel.h"

#include "providers/FolderProvider.h"
#include <QDebug>
#include <QDir>
#include <QStringView>
#include <QVector>

FolderListModel::FolderListModel(QObject *parent)
    : QAbstractListModel(parent), m_bError(false) {
  int role = Qt::UserRole;
  m_roleNames.insert(role++, "icon");
  m_roleNames.insert(role++, "title");
  m_roleNames.insert(role++, "count");
  m_roleNames.insert(role++, "path");
}
FolderListModel::~FolderListModel() { clear(); }
int FolderListModel::rowCount(const QModelIndex &parent) const {
  return m_videos.size();
}
QVariant FolderListModel::data(const QModelIndex &index, int role) const {
  QVector<QString> *d = m_videos[index.row()];
  return d->at(role - Qt::UserRole);
}
QHash<int, QByteArray> FolderListModel::roleNames() const {
  return m_roleNames;
}
QString FolderListModel::source() const { return m_strXmlFile; }
void FolderListModel::setSource(const QString &filePath) {
  m_strXmlFile = filePath;
  reload(filePath);
  if (m_bError) {
    qDebug() << "VideoListModel, error - " << m_strError;
  }
}
QString FolderListModel::errorString() const { return m_strError; }
bool FolderListModel::hasError() const { return m_bError; }
void FolderListModel::reload(const QString &path) {
  beginResetModel();
  reset();
  load(path);
  endResetModel();
}
void FolderListModel::remove(int index) {
  beginRemoveRows(QModelIndex(), index, index);
  delete m_videos.takeAt(index);
  endRemoveRows();
}

void FolderListModel::load(const QString &path) {
  qInfo() << "FolderListModel Load====================================: "
          << path;

  auto dataVector = providers::SelectFolders();

  QVectorIterator<providers::FolderInfo> dataIterator(dataVector);
  while (dataIterator.hasNext()) {
    auto info = dataIterator.next();
    qDebug() << "info ==" << info.path;

    QFileInfo fileInfo(info.path);
    QString filename(fileInfo.fileName());


    auto video = new QVector<QString>();
    video->append("qrc:/desktop/assets/images/icons/folder.svg");
    video->append(filename);
    video->append(QString::number(info.count));
    video->append(info.path);
    m_videos.append(video);
  }

  //  auto video = new QVector<QString>();
  //  video->append("qrc:/desktop/assets/images/icons/folder.svg");
  //  video->append("动图2");
  //  video->append("19");
  //  video->append("/Users/Larry/temp/images");
  //  m_videos.append(video);
  //
  //  auto video2 = new QVector<QString>();
  //  video2->append("qrc:/desktop/assets/images/icons/folder.svg");
  //  video2->append("Images");
  //  video2->append("2190");
  //  video2->append("/Users/Larry/temp/images");
  //  m_videos.append(video2);
  //
  //  auto video3 = new QVector<QString>();
  //  video3->append("qrc:/desktop/assets/images/icons/folder.svg");
  //  video3->append("搞笑");
  //  video3->append("182");
  //  video3->append("/Users/Larry/temp/images");
  //  m_videos.append(video3);

  qInfo() << "files count = " << m_videos.size();
}
void FolderListModel::reset() {
  m_bError = false;
  m_strError.clear();
  clear();
}
void FolderListModel::clear() {
  int count = m_videos.size();
  if (count > 0) {
    for (int i = 0; i < count; i++) {
      delete m_videos.at(i);
    }
    m_videos.clear();
  }
}

QVariantMap FolderListModel::get(int index) {
  QVariantMap itemMap;
  if (index < m_videos.size()) {
    auto item = m_videos[index];
    if (item != nullptr && item->length() > 1) {
      itemMap["pk"] = (*item)[0];
      itemMap["title"] = (*item)[1];
    }
  }
  return itemMap;
}

void FolderListModel::add(QVariantMap value) {
  auto index = value["index"].value<int>();
  auto path = value["path"].value<QString>();
  qDebug() << "insertRows2" << index << "name: " << path;

  if (path.indexOf("file://") == 0) {
    path = path.replace(0, 7, "");
  }

  beginInsertRows(QModelIndex(), index, index);

  auto video2 = new QVector<QString>();
  video2->append("qrc:/desktop/assets/images/icons/folder.svg");
  video2->append(path);
  video2->append("18222");
  video2->append(path);
  m_videos.insert(index, video2);

  endInsertRows();
}

void FolderListModel::update(int index, QVariantMap value) {
  auto title = value["name"].value<QString>();
  qDebug() << "updateRows" << title;
  auto item = m_videos[index];
  auto pk = (*item)[0];
  qDebug() << "updateRows2" << pk << "|" << title;
}
