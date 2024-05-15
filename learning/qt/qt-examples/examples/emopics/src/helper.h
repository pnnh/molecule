//
// Created by Larry on 2022/11/4.
//

#ifndef EMOPICS_SRC_HELPER_H
#define EMOPICS_SRC_HELPER_H

#include <QString>
#include <QFileInfo>

class Helper {
public:
  static void Process(const QString &path);

private:
  static void convert(const QFileInfo &path);
};

#endif //EMOPICS_SRC_HELPER_H
