#include <iostream>
#include <string>
#include <map>
#include <vector>

struct X {
  X() {
    std::cout << "default ctor" << std::endl;
  }
  X(const X &other) {
    std::cout << "copy ctor" << std::endl;
  }
};

class T {
  std::vector<int> data_;
 public:
  std::vector<int> &items() {
    return data_;
  }
};

T foo() {
  T t;
  return t;
}

std::map<int, std::string> index_map{{1, "hello"}, {2, "world"}, {3, "!"}};
int int_array[] = {0, 1, 2, 3, 4, 5, 6, 7, 8};

int main() {
  for (const auto &e: index_map) {
    std::cout << "key=" << e.first << ", value=" << e.second << std::endl;
  }
  for (auto e: int_array) {
    std::cout << e << std::endl;
  }
  std::vector<X> x(10);
  std::cout << "for (auto n : x)" << std::endl;
  for (auto n: x) {
  }
  std::cout << "for (const auto &n : x)" << std::endl;
  for (const auto &n: x) {
  }

  T thing = foo();
  for (auto &x: thing.items()) {}

  for (T thing = foo(); auto &x: thing.items()) {}  // C++20语法
}
