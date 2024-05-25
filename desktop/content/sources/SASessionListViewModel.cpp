#include "SASessionListViewModel.h"

#include "services/UserService.h"

#include <QDebug>
#include <QDir>
#include <QStringView>

SASessionListViewModel::SASessionListViewModel(QObject *parent)
    : QAbstractListModel(parent) {
  int role = Qt::UserRole;
  dataNames.insert(role++, "title");
  dataNames.insert(role++, "path");
  load();
}

SASessionListViewModel::~SASessionListViewModel() {

}

int SASessionListViewModel::rowCount(const QModelIndex &parent) const {
  int size = dataList.size();
  return size;
}

QVariant SASessionListViewModel::data(const QModelIndex &index,
                                  int role) const {
  QVector<QString> *d = dataList[index.row()];
  return d->at(role - Qt::UserRole);
}

QHash<int, QByteArray> SASessionListViewModel::roleNames() const {
  return dataNames;
}

void SASessionListViewModel::load() {
  auto homeDirectory = UserService::HomeDirectory();
  auto model = new QVector<QString>();
  model->append("一个聊天用户");
  model->append(homeDirectory);
  dataList.append(model);

  qInfo() << "files count = " << dataList.size();
}
