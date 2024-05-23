#pragma once

#include <QAbstractListModel>
#include <QtQml/qqmlregistration.h>

class PictureLocationViewModel : public QAbstractListModel {
  Q_OBJECT
  QML_ELEMENT

public:
  explicit PictureLocationViewModel(QObject *parent = 0);
  ~PictureLocationViewModel() override;

  PictureLocationViewModel(const PictureLocationViewModel &) = delete;
        PictureLocationViewModel &operator=(const PictureLocationViewModel &) = delete;
  PictureLocationViewModel(PictureLocationViewModel &&) = delete;
        PictureLocationViewModel &operator=(PictureLocationViewModel &&) = delete;

  int rowCount(const QModelIndex &parent) const override;
  QVariant data(const QModelIndex &index, int role) const override;
  QHash<int, QByteArray> roleNames() const override;

  Q_INVOKABLE void remove(int index);
  // Q_INVOKABLE QVariantMap get(int index);
  Q_INVOKABLE void add(QVariantMap value);
  Q_INVOKABLE void update(int index, QVariantMap value);

private:
  void load();

  void reset();

  void clear();

  QHash<int, QByteArray> dataNames;
  QVector<QVector<QString> *> dataList;
};
