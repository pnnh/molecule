#include <iostream>
#include <type_traits>

class A {};
class B : public A {};
class C {};

template<class T>
class E {
  static_assert(std::is_base_of<A, T>::value, "T is not base of A");
  //static_assert(std::is_base_of<A, T>::value);  // C++17语法
};

#define MAX_BUFFER_SIZE 1024

void *resize_buffer(void *buffer, int new_size) {
// 断言不可替代常规的业务判断
  assert(buffer != nullptr);
  assert(new_size > 0);
  assert(new_size <= MAX_BUFFER_SIZE);
}

bool get_user_input(char c) {
  assert(c == '\0x0d');
}

int main(int argc, char *argv[]) {
  //static_assert(argc > 0, "argc > 0");    // 编译出错，不是常量表达式
  //E<C> x;   // 将会触发断言
  static_assert(sizeof(int) >= 4, "sizeof(int) >= 4");
  //static_assert(sizeof(int) < 4);   //触发断言
  E<B> y;     // 不会触发断言
}
