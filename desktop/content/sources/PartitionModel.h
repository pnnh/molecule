#ifndef PS_CONTENT_MODELS_PARTITION_H
#define PS_CONTENT_MODELS_PARTITION_H

#include <QtCore>
#include <QtQml/qqmlregistration.h>
#include <QAbstractListModel>

typedef QVector<QString> PartitionData;

class PartitionModel : public QAbstractListModel
{
  Q_OBJECT
  QML_ELEMENT

public:
  explicit PartitionModel(QObject *parent = nullptr);
  ~PartitionModel() override;

  [[nodiscard]] int rowCount(const QModelIndex &parent) const override;
  [[nodiscard]] QHash<int, QByteArray> roleNames() const override;
  [[nodiscard]] QVariant data(const QModelIndex &index, int role) const override;

private:
  void loadData();
  QHash<int, QByteArray> dataNames;
  QVector<PartitionData *> dataList;
};

#endif // PS_CONTENT_MODELS_PARTITION_H
