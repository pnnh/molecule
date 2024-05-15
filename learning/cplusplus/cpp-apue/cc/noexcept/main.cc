#include <iostream>
#include <vector>
#include <algorithm>

struct X {
  int f() const noexcept { return 58; }
  void g() noexcept {}
};

int foo() noexcept { return 42; }
int foo1() { return 42; }
int foo2() throw() { return 42; }

template<class T>
T copy(const T &o) noexcept(std::is_fundamental<T>::value) {

}
template<class T>
T copy2(const T &o) noexcept(noexcept(T(o))) {

}

int main(int argc, char *argv[]) {
  std::cout << std::boolalpha;
  std::cout << "noexcept(foo()) = " << noexcept(foo()) << std::endl;
  std::cout << "noexcept(foo1()) = " << noexcept(foo1()) << std::endl;
  std::cout << "noexcept(foo2()) = " << noexcept(foo2()) << std::endl;
}