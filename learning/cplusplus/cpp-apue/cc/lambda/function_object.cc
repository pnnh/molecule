#include <iostream>
#include <vector>
#include <algorithm>

class Bar {
 public:
  Bar(int x, int y) : x_(x), y_(y) { }
  int operator () () {
    return x_ * y_;
  }
 private:
  int x_;
  int y_;
};

int main() {
  int x = 5, y = 8;
  auto foo = [x, y] { return x * y; };
  Bar bar(x, y);
  std::cout << "foo() = " << foo() << std::endl;
  std::cout << "bar() = " << bar() << std::endl;

  std::vector<int> x2 = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
  std::cout << *std::find_if(x2.cbegin(), x2.cend(),
                             [](int i) {
    return (i % 3) == 0;
  }) << std::endl;

  int x3 = 5;
  auto foo2 = [x3 = x3 + 1] { return x3; }; // C++14 功能
  auto foo3 = [r = x3 + 1] { return r; }; // C++14 功能

  std::cout << foo2() << "|" << foo3() << std::endl;

  std::string x4 = "hello c++";
  auto foo4 = [r = std::move(x4)] {
    return r + " world";
  };
  std::cout << foo4() << std::endl;
}