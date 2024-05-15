#include <iostream>

void bar1() {
  int x = 5, y = 8;
  auto foo = [x, y] {
//    x += 1;   // 编译出错，默认捕获的值是只读的，无法修改
//    y += 2;
    return x * y;
  };
  std::cout << foo() << std::endl;
}

void bar2() {
  int x = 5, y = 8;
  auto foo = [&x, &y] {
    x += 1;
    y += 2;
    return x * y;
  };
  std::cout << foo() << std::endl;
}

void bar3() {
  int x = 5, y = 8;
  auto foo = [x, y] () mutable {
    x += 1;
    y += 2;
    return x * y;
  };
  std::cout << foo() << std::endl;
}

int run_main() {
  int x = 5, y = 8;
  auto foo = [x, &y] () mutable {
    x += 1;
    y += 2;
    std::cout << "lambda x = " << x << ", y = " << y << std::endl;
    return x * y;
  };
  foo();
  std::cout << "call1 x = " << x << ", y = " << y << std::endl;
  foo();
  std::cout << "call2 x = " << x << ", y = " << y << std::endl;

  // 运行结果如下：
  // lambda x = 6, y = 10
  // call1 x = 5, y = 10
  // lambda x = 7, y = 12
  // call2 x = 5, y = 12
}

int run_main2() {
  int x = 5, y = 8;
  auto foo = [x, y] {
    return x * y;
  };
  std::cout << foo() << std::endl;

  int x1 = 5, y1 = 8;
  auto foo2 = [&x1, &y1] {
    return x1 * y1;
  };
  std::cout << foo2() << std::endl;
}

int run_main3() {
  int x = 5, y = 8;
  auto foo = [x, &y]() mutable {
    x += 1;
    y += 2;
    std::cout << "lambda x = " << x << ", y = " << y << std::endl;
  };
  x = 9;
  y = 20;
  foo();

  // 输出结果为：
  // lambda x = 6, y = 22
}

int main(int argc, char *argv[]) {

  run_main3();
}
