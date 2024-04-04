//
// Created by linyangz on 2021/11/25.
//

#ifndef QTEMPTY_VIDEOLISTMODEL_H
#define QTEMPTY_VIDEOLISTMODEL_H

#include <QAbstractListModel>

class VideoListModelPrivate;
class VideoListModel : public QAbstractListModel {
 Q_OBJECT
  Q_PROPERTY(QString source READ source WRITE setSource)
 public:
  explicit VideoListModel(QObject *parent = nullptr);
  ~VideoListModel() override;
  [[nodiscard]] int rowCount(const QModelIndex &parent) const override;
  [[nodiscard]] QVariant data(const QModelIndex &index, int role) const override;
  [[nodiscard]] QHash<int, QByteArray> roleNames() const override;
  [[nodiscard]] QString source() const;
  void setSource(const QString &filePath);
  Q_INVOKABLE [[nodiscard]] QString errorString() const;
  Q_INVOKABLE [[nodiscard]] bool hasError() const;
  Q_INVOKABLE void reload();
  Q_INVOKABLE void remove(int index);
  Q_INVOKABLE QVariantMap get(int index);
  Q_INVOKABLE void add(QVariantMap value);
  Q_INVOKABLE void update(int index, QVariantMap value);
 private:
  VideoListModelPrivate *m_dptr;
};

#endif //QTEMPTY_VIDEOLISTMODEL_H
