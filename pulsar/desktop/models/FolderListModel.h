//
// Created by linyangz on 2022/10/14.
//

#ifndef EMOTION_DESKTOP_INCLUDE_FolderListModel_H
#define EMOTION_DESKTOP_INCLUDE_FolderListModel_H

#include <QAbstractListModel>
#include <QtQml/qqmlregistration.h>

class FolderListModel : public QAbstractListModel {
  Q_OBJECT
  QML_ELEMENT
  Q_PROPERTY(QString source READ source WRITE setSource)
public:
  FolderListModel(QObject *parent = 0);

  ~FolderListModel();

  int rowCount(const QModelIndex &parent) const;

  QVariant data(const QModelIndex &index, int role) const;

  QHash<int, QByteArray> roleNames() const;

  QString source() const;

  void setSource(const QString &filePath);

  Q_INVOKABLE QString errorString() const;

  Q_INVOKABLE bool hasError() const;

  Q_INVOKABLE void reload(const QString &path);

  Q_INVOKABLE void remove(int index);
  Q_INVOKABLE QVariantMap get(int index);
  Q_INVOKABLE void add(QVariantMap value);
  Q_INVOKABLE void update(int index, QVariantMap value);

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

#endif // EMOTION_DESKTOP_INCLUDE_FolderListModel_H
