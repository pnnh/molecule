#include <iostream>
#include <string>

template<class T>
void show_type(T t) {
  std::cout << typeid(t).name() << std::endl;
}

template<class T>
void normal_forwarding(T t) {
  show_type(t);
}

template<class T>
void perfect_forwarding(T &&t) {
  //show_type(static_cast<T&&>(t));
  show_type(std::forward<T>(t));    // 简便的写法
}

std::string get_string() {
  return "hi world";
}

int main(int argc, char *argv[]) {
  std::string s = "hello world";
  normal_forwarding(s);

  perfect_forwarding(s);
  perfect_forwarding(get_string());
}