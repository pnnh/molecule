#include <iostream>

class Base {
 public:
  Base() : x_(0), y_(0.) {};
  Base(int x, double y) : x_(x), y_(y) {};
  Base(int x) : x_(x), y_(0.) {
    std::cout << "Base(int x)" << std::endl;
  };
  Base(double y) : x_(0), y_(y) {
    std::cout << "Base(double y)" << std::endl;
  };
 private:
  int x_;
  double y_;
};

class Base2 {
 public:
  Base2(int) {
    std::cout << "Base2(int)" << std::endl;
  }
};

class Derived : public Base {
 public:
  using Base::Base;
  // using Base2::Base2;   // 将报错，不能继承多个签名相同的构造函数
  Derived(int x) {
    std::cout << "Derived(int x)" << std::endl;
  }
};

int main(int argc, char *argv[]) {
  Derived d(5);
  Derived d1(5.5);

  return 0;
}