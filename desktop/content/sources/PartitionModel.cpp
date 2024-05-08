#include "content/sources/PartitionModel.h"

PartitionModel::PartitionModel(QObject *parent) : QAbstractListModel(parent)
{
  int role = Qt::UserRole;
  dataNames.insert(role++, "uid");
  dataNames.insert(role++, "name");

  loadData();
}

PartitionModel::~PartitionModel()
{
}

void PartitionModel::loadData()
{
  int index = 0;
  while (index < 10)
  {
    auto dataPtr = new PartitionData();
    QString uid = QString("uid%1").arg(index);
    QString name = QString("Partition %1").arg(index);

    dataPtr->append(uid);
    dataPtr->append(name);
    dataList.append(dataPtr);

    index += 1;
  }
}

int PartitionModel::rowCount(const QModelIndex &parent = QModelIndex()) const
{
  auto size = dataList.size();
  return size;
}

QVariant PartitionModel::data(const QModelIndex &index, int role) const
{
  PartitionData *dataPtr = dataList[index.row()];
  auto value = dataPtr->at(role - Qt::UserRole);
  return value;
}

QHash<int, QByteArray> PartitionModel::roleNames() const
{
  return dataNames;
}
