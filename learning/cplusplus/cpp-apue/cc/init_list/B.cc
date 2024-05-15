//
// Created by Larry on 2022/1/5.
//

#include "B.h"

struct Point3D {
  int x;
  int y;
  int z;
};

struct Line {
  Point3D a;
  Point3D b;
};

union u {
  int a;
  const char* b;
};

B::B(std::initializer_list<std::string> a) {
    for (const std::string* item = a.begin(); item != a.end(); ++item) {
      std::cout << *item << " ";
    }
    std::cout << std::endl;

    Point3D p{ .z = 3 };

    u f = { .a = 1 };

    //Lie l{ .a.y = 5 };    // 编译失败，不能嵌套初始化
}

struct type {
  type() = default;
  virtual ~type() = delete;
  type(const type &);
};

type::type(const type&) = default;