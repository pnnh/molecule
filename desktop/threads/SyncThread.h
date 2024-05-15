//
// Created by Larry on 2024/5/8.
//

#ifndef SYNCTHREAD_H
#define SYNCTHREAD_H

#include <qthread.h>


class SyncThread : public QThread {
public:
  explicit SyncThread();
  ~SyncThread() override;

  void run() override;

private:
  bool closed = false;
};



#endif //SYNCTHREAD_H
