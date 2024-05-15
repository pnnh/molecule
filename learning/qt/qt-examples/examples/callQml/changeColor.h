//
// Created by Larry on 2021/11/16.
//

#ifndef QTEMPTY_CHANGECOLOR_H
#define QTEMPTY_CHANGECOLOR_H

#include <QObject>
#include <QTimer>

class ChangeQmlColor : public QObject {
  Q_OBJECT
 public:
  ChangeQmlColor(QObject *target, QObject *parent = 0);
  ~ChangeQmlColor();

 protected slots:
      void onTimeout();

 private:
  QTimer m_timer;
  QObject *m_target;
};

#endif //QTEMPTY_CHANGECOLOR_H
