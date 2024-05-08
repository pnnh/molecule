//
// Created by Larry on 2024/5/8.
//

#include "SyncThread.h"

#include "services/sync_service.h"

#include <QDebug>

void SyncThread::run() {
  qDebug() << "当前子线程ID:" << QThread::currentThreadId();
  SyncService syncService;
  while (true) {
    QThread::sleep(5);
    qDebug() << "开始执行本次循环，开始同步数据";
    syncService.SyncLibraries();
  }
  qDebug() << "线程结束";
}