#include <string>
#include <iostream>

std::nullptr_t null1, null2;

int run_main() {
  char *ch = nullptr;
  char *ch2 = 0;
  assert(ch == 0);
  assert(ch == nullptr);
  assert(!ch);
  assert(ch2 == nullptr);
  assert(nullptr == 0);
}

int run_main2() {
  static_assert(sizeof(std::nullptr_t) == sizeof(void *));

  char *ch = null1;
  char *ch2 = null2;
  assert(ch == 0);
  assert(ch == nullptr);
  assert(ch == null2);
  assert(null1 == null2);
  assert(nullptr == null1);

}

template<class T>
struct widget {
  widget() {
    std::cout << "template" << std::endl;
  }
};

template<>
struct widget<std::nullptr_t> {
  widget() {
    std::cout << "nullptr" << std::endl;
  }
};

template<class T>
widget<T> *make_widget(T) {
  return new widget<T>();
}

int main() {
  std::cout << "&null1" << &null1 << std::endl;
  std::cout << "&null2" << &null2 << std::endl;
  //std::cout << "&nullptr = " << &nullptr << std::endl;    // 编译错误
  auto w1 = make_widget(0);
  auto w2 = make_widget(nullptr);
}