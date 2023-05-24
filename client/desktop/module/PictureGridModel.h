//
// Created by Larry on 2021/11/25.
//

#ifndef QTEMPTY_VIDEOLISTMODEL_H
#define QTEMPTY_VIDEOLISTMODEL_H

#include <QAbstractListModel>
#include <QtQml/qqmlregistration.h>

class PictureGridModel : public QAbstractListModel {
  Q_OBJECT
  QML_ELEMENT
  Q_PROPERTY(QString source READ source WRITE setSource)
public:
  PictureGridModel(QObject *parent = 0);

  ~PictureGridModel();

  int rowCount(const QModelIndex &parent) const;

  QVariant data(const QModelIndex &index, int role) const;

  QHash<int, QByteArray> roleNames() const;

  QString source() const;

  void setSource(const QString &filePath);

  Q_INVOKABLE QString errorString() const;

  Q_INVOKABLE bool hasError() const;

  Q_INVOKABLE void reload(const QString &path);

  Q_INVOKABLE void remove(int index);

private:
  void load(const QString &path);

  void reset();

  void clear();

  QString m_strXmlFile;
  QString m_strError;
  bool m_bError;
  QHash<int, QByteArray> m_roleNames;
  QVector<QVector<QString> *> m_videos;
};

#endif // QTEMPTY_VIDEOLISTMODEL_H
