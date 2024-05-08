//
// Created by Larry on 2024/5/8.
//

#ifndef SYNCTHREAD_H
#define SYNCTHREAD_H

#include <qthread.h>


class SyncThread : public QThread {
public:
  void run() override;
};



#endif //SYNCTHREAD_H
