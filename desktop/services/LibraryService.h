//
// Created by Larry on 2024/5/8.
//

#ifndef LIBRARY_SERVICE_H
#define LIBRARY_SERVICE_H

#include "models/library_model.h"

class LibraryService {
public:
  LibraryService();

  QVector<LibraryModel> SelectLibraries() const;
  void InsertOrUpdateLibrary(QVector<LibraryModel> libraryList);

private:
  QString dbPath;
};



#endif //LIBRARY_SERVICE_H
