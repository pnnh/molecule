#pragma once

#include <QAbstractListModel>
#include <QtQml/qqmlregistration.h>

class PictureGridModel : public QAbstractListModel {
  Q_OBJECT
  QML_ELEMENT

public:
  explicit PictureGridModel(QObject *parent = 0);
  ~PictureGridModel() override;
  PictureGridModel(const PictureGridModel &) = delete;
  PictureGridModel &operator=(const PictureGridModel &) = delete;
  PictureGridModel(PictureGridModel &&) = delete;
  PictureGridModel &operator=(PictureGridModel &&) = delete;

  int rowCount(const QModelIndex &parent) const override;

  QVariant data(const QModelIndex &index, int role) const override;

  QHash<int, QByteArray> roleNames() const override;

  Q_INVOKABLE void reload(const QString &path);

  Q_INVOKABLE void remove(int index);

private:
  void load(const QString &path);

  void reset();

  void clear();

  QHash<int, QByteArray> dataNames;
  QVector<QVector<QString> *> dataList;
};
