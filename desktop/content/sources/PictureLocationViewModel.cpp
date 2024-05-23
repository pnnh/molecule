#include "PictureLocationViewModel.h"

#include <QDebug>
#include <QDir>
#include <QStringView>
#include <QVector>

PictureLocationViewModel::PictureLocationViewModel(QObject *parent)
    : QAbstractListModel(parent) {
  int role = Qt::UserRole;
  dataNames.insert(role++, "icon");
  dataNames.insert(role++, "title");
  dataNames.insert(role++, "count");
  dataNames.insert(role++, "path");
}

PictureLocationViewModel::~PictureLocationViewModel() { clear(); }

int PictureLocationViewModel::rowCount(const QModelIndex &parent) const {
  return dataList.size();
}

QVariant PictureLocationViewModel::data(const QModelIndex &index,
                                        int role) const {
  QVector<QString> *d = dataList[index.row()];
  return d->at(role - Qt::UserRole);
}

QHash<int, QByteArray> PictureLocationViewModel::roleNames() const {
  return dataNames;
}

void PictureLocationViewModel::reload(const QString &path) {
  beginResetModel();
  reset();
  load(path);
  endResetModel();
}

void PictureLocationViewModel::remove(int index) {
  beginRemoveRows(QModelIndex(), index, index);
  delete dataList.takeAt(index);
  endRemoveRows();
}

void PictureLocationViewModel::load(const QString &path) {
  qInfo()
      << "PictureLocationViewModel Load====================================: "
      << path;

  // auto dataVector = providers::SelectFolders();
  //
  // QVectorIterator<providers::FolderInfo> dataIterator(dataVector);
  // while (dataIterator.hasNext()) {
  //   auto info = dataIterator.next();
  //   qDebug() << "info ==" << info.path;
  //
  //   QFileInfo fileInfo(info.path);
  //   QString filename(fileInfo.fileName());
  //
  //   auto video = new QVector<QString>();
  //   video->append("qrc:/desktop/assets/images/icons/folder.svg");
  //   video->append(filename);
  //   video->append(QString::number(info.count));
  //   video->append(info.path);
  //   m_videos.append(video);
  // }

  auto video = new QVector<QString>();
  video->append("qrc:/desktop/assets/images/icons/folder.svg");
  video->append("动图2");
  video->append("19");
  video->append("/Users/linyangz/temp/images");
  dataList.append(video);

  auto video2 = new QVector<QString>();
  video2->append("qrc:/desktop/assets/images/icons/folder.svg");
  video2->append("Images");
  video2->append("2190");
  video2->append("/Users/linyangz/temp/images");
  dataList.append(video2);

  auto video3 = new QVector<QString>();
  video3->append("qrc:/desktop/assets/images/icons/folder.svg");
  video3->append("搞笑");
  video3->append("182");
  video3->append("/Users/linyangz/temp/images");
  dataList.append(video3);

  qInfo() << "files count = " << dataList.size();
}

void PictureLocationViewModel::reset() { clear(); }

void PictureLocationViewModel::clear() {
  int count = dataList.size();
  if (count > 0) {
    for (int i = 0; i < count; i++) {
      delete dataList.at(i);
    }
    dataList.clear();
  }
}

QVariantMap PictureLocationViewModel::get(int index) {
  QVariantMap itemMap;
  if (index < dataList.size()) {
    auto item = dataList[index];
    if (item != nullptr && item->length() > 1) {
      itemMap["pk"] = (*item)[0];
      itemMap["title"] = (*item)[1];
    }
  }
  return itemMap;
}

void PictureLocationViewModel::add(QVariantMap value) {
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
  dataList.insert(index, video2);

  endInsertRows();
}

void PictureLocationViewModel::update(int index, QVariantMap value) {
  auto title = value["name"].value<QString>();
  qDebug() << "updateRows" << title;
  auto item = dataList[index];
  auto pk = (*item)[0];
  qDebug() << "updateRows2" << pk << "|" << title;
}
