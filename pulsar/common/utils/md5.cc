//
// Created by linyangz on 2021/12/11.
//

#include "md5.h"
#include <QtCore>

string calcMd5(const string& content) {
  QString md5;
  QString pwd = QString::fromUtf8(content);
  QByteArray bb;

  bb = QCryptographicHash::hash (pwd.toUtf8(), QCryptographicHash::Md5 );
  md5.append(bb.toHex());

  return md5.toStdString();
}

std::string toString(const md5::digest_type &digest) {
  const auto charDigest = reinterpret_cast<const char *>(&digest);
  std::string result;
  boost::algorithm::hex(charDigest, charDigest + sizeof(md5::digest_type), std::back_inserter(result));
  return result;
}