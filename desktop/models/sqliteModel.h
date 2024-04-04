//
// Created by linyangz on 2022/1/31.
//

#ifndef QT_EDITOR_SQLITEMODEL_H
#define QT_EDITOR_SQLITEMODEL_H

#include <QtCore>
class sqliteModel : public QObject {
 Q_OBJECT
 public:
  explicit sqliteModel(QObject *parent = nullptr);
  ~sqliteModel() override;
  Q_INVOKABLE QVariantMap getTask(QString pk);
  Q_INVOKABLE void updateTaskBody(QString pk, QString body);
};

#endif //QT_EDITOR_SQLITEMODEL_H
