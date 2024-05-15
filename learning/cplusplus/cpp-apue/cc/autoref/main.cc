#include <iostream>
#include "Base.h"

template<auto N>
void f() {
  std::cout << N << std::endl;
}

template<typename N>
void f2(N a) {
  std::cout << a << std::endl;
}

template<decltype(auto) N>
void f3() {
  std::cout << N << std::endl;
}

template<class T>
decltype(auto) return_ref(T& t) {
  return t;
}

static const int x = 11;
static int y = 7;

int main(int argc, char *argv[]) {
  f<5>();
  f<'c'>();
  //f<5.0>();   // 编译错误，模板参数不能为double
  f2<int>(3);
  f2<char>('d');
  f2(5);
  f2('e');

  f3<x>();    // N为const int类型
  f3<(x)>();   // N为const int&类型
  //f3<y>();     // 编译错误
  f3<(y)>();   // N为int&类型

  int x1 = 0;
  static_assert(std::is_reference_v<decltype(return_ref(x1))>);   // 应该编译成功

  Base *d = new Derived();
  auto b = *d;
  b.f();

  auto &c = *d;
  c.f();
}