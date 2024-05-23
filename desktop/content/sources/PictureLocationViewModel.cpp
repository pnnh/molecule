#include "PictureLocationViewModel.h"

#include "services/UserService.h"

#include <QDebug>
#include <QDir>
#include <QStringView>
#include <QVector>

PictureLocationViewModel::PictureLocationViewModel(QObject *parent)
    : QAbstractListModel(parent) {
  int role = Qt::UserRole;
  dataNames.insert(role++, "title");
  dataNames.insert(role++, "path");
  load();
}

PictureLocationViewModel::~PictureLocationViewModel() { clear(); }

int PictureLocationViewModel::rowCount(const QModelIndex &parent) const {
  int size = dataList.size();
  return size;
}

QVariant PictureLocationViewModel::data(const QModelIndex &index,
                                        int role) const {
  QVector<QString> *d = dataList[index.row()];
  return d->at(role - Qt::UserRole);
}

QHash<int, QByteArray> PictureLocationViewModel::roleNames() const {
  return dataNames;
}

void PictureLocationViewModel::remove(int index) {
  beginRemoveRows(QModelIndex(), index, index);
  delete dataList.takeAt(index);
  endRemoveRows();
}

void PictureLocationViewModel::load() {
  auto homeDirectory = UserService::HomeDirectory();
  auto model = new QVector<QString>();
  model->append("主目录");
  model->append(homeDirectory);
  dataList.append(model);

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

// QVariantMap PictureLocationViewModel::get(int index) {
//   QVariantMap itemMap;
//   if (index < dataList.size()) {
//     auto item = dataList[index];
//     if (item != nullptr && item->length() > 1) {
//       itemMap["pk"] = (*item)[0];
//       itemMap["title"] = (*item)[1];
//     }
//   }
//   return itemMap;
// }

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
