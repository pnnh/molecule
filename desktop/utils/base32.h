//
// Created by Larry on 2024/5/8.
//

#ifndef BASE32_H
#define BASE32_H
#include <QString>


class Base32Encoder {
public:
  static QString Encode(const QString &data);
};

#endif //BASE32_H
