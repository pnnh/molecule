//
// Created by Larry on 2024/5/8.
//

#ifndef SYNC_SERVICE_H
#define SYNC_SERVICE_H
#include "LibraryService.h"

class SyncService {
public:
  void SyncLibraries();

private:
  LibraryService libraryService;
};



#endif //SYNC_SERVICE_H
