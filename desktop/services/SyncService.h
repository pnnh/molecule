#pragma once

#include "LibraryService.h"

class SyncService {
public:
  void SyncLibraries();

private:
  LibraryService libraryService;
};
