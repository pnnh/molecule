//
// Created by linyangz on 2021/12/11.
//

#ifndef QT_CANVAS_MD5_H
#define QT_CANVAS_MD5_H

#include <string>

#include <iostream>
#include <algorithm>
#include <iterator>
#include <boost/uuid/detail/md5.hpp>
#include <boost/algorithm/hex.hpp>

using boost::uuids::detail::md5;
using namespace std;

std::string toString(const md5::digest_type &digest);

string calcMd5(const string& content);

#endif //QT_CANVAS_MD5_H
