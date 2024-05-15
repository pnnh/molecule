//
// Created by Larry on 2022/2/1.
//

#ifndef HELLO_MYTYPE_H
#define HELLO_MYTYPE_H

#include <QObject>
#include <qqmlregistration.h>

class MyType : public QObject
{
  Q_OBJECT
      QML_ELEMENT
  Q_PROPERTY(int answer READ answer WRITE setAnswer NOTIFY answerChanged)
signals:
    void answerChanged();

public:
  int answer() const;
  void setAnswer(int answer);


};

#endif //HELLO_MYTYPE_H
