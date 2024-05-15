#pragma once

#include "models/library_model.h"

class LibraryService {
public:
  LibraryService();

  QVector<LibraryModel> SelectLibraries() const;
  void InsertOrUpdateLibrary(const QVector<LibraryModel>& libraryList);

private:
  QString dbPath;
};