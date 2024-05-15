#include <string>
#include <list>
#include <set>
#include <map>
#include <string>
#include <vector>
#include "B.h"

struct C {
  C(std::string a, int b) { }
  C(int a) { }
};

void foo (C) { }

C bar() {
  return { "world", 5 };
}

C bar2() {
  return 3;
}

int run_main() {
  int x[] = {1,2,3,4,5};
  int x1[]{1,2,3,4,5};
  std::vector<int> x2 {1,2,3,4,5};
  std::vector<int> x3 = {1,2,3,4,5};
  std::list<int> x4{1,2,3,4,5};
  std::list<int> x5{1,2,3,4,5};
  std::set<int> x6{1,2,3,4,5};
  std::set<int> x7{1,2,3,4,5};
  std::map<std::string, int> x8{{"bear", 4}, {"cassowary", 2}, {"tiger", 7}};
  std::map<std::string, int> x9 = {{"bear", 4}, {"cassowary", 2}, {"tiger", 7}};
}

int main() {
  int x = {5};  // 拷贝初始化
  int x1{8};    // 直接初始化
  C x2 = {4}; // 拷贝初始化
  C x3{2};  // 直接初始化
  foo({8}); // 拷贝初始化
  foo({"hello", 8});  // 拷贝初始化
  C x4 = bar(); // 拷贝初始化
  C *x5 = new C{ "hi", 42 };  // 直接初始化

  B b{ "hello", "c++", "world"};
}
