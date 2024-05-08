//
// Created by Larry on 2024/5/8.
//

#ifndef SYNC_SERVICE_H
#define SYNC_SERVICE_H
#include "library_service.h"

class SyncService {
public:
  void SyncLibraries();

private:
  library_service libraryService;
};



#endif //SYNC_SERVICE_H
