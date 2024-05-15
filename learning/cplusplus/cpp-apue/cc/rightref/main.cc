#include <iostream>
#include <chrono>
#include "BigMemoryPool.h"

class X {
 public:
  X() { std::cout << "X ctor" << std::endl; }
  X(const X &x) { std::cout << "X copy ctor" << std::endl; }

  ~X() { std::cout << "X dtor" << std::endl; }
  void show() { std::cout << "show X" << std::endl; }
};

X make_x() {
  X x1;
  return x1;
}

int main(int argc, char *argv[]) {
  // 需要关闭gcc -fno-elide-constructors函数返回值优化才能看到效果
  X &&x2 = make_x();
  x2.show();
  std::cout << "--------------------" << std::endl;
  X x3 = make_x();
  x3.show();
  std::cout << "--------------------" << std::endl;
  BigMemoryPool my_pool = make_pool();

  auto start = std::chrono::high_resolution_clock::now();
  for (int i = 0; i < 1000000; i++) {
    BigMemoryPool my_pool;
    my_pool = make_pool();
    BigMemoryPool my_pool3 = static_cast<BigMemoryPool&&>(my_pool);
  }
  auto end = std::chrono::high_resolution_clock::now();
  std::chrono::duration<double> diff = end - start;
  std::cout << "Time to call make_pool : " << diff.count() << " s" << std::endl;

  move_pool(make_pool());
}