#include <iostream>

struct X {

};

struct M {
  M() {}
  M(const M &) {}
  M(M &&) noexcept {}
  M operator=(const M &) noexcept { return *this; }
  M operator=(M &&) { return *this; }
};

struct M2 {
  ~M2() noexcept(false) {}
};

struct X2 {
  M m;
};

struct X3 {
  ~X3() {}
};

struct X4 {
  ~X4() noexcept(false) {}
};

#define PRINT_NOEXCEPT(x) \
  std::cout << #x << " = " << x << std::endl;

int run_main() {

  X x;
  std::cout << std::boolalpha;

  PRINT_NOEXCEPT(noexcept(X()));
  PRINT_NOEXCEPT(noexcept(X(x)));
  PRINT_NOEXCEPT(noexcept(X(std::move(x))));
  PRINT_NOEXCEPT(noexcept(x.operator=(x)));
  PRINT_NOEXCEPT(noexcept(x.operator=(std::move(x))));
}

int run_main2() {
  X2 x2;
  std::cout << std::boolalpha;

  PRINT_NOEXCEPT(noexcept(X2()));
  PRINT_NOEXCEPT(noexcept(X2(x2)));
  PRINT_NOEXCEPT(noexcept(X2(std::move(x2))));
  PRINT_NOEXCEPT(noexcept(x2.operator=(x2)));
  PRINT_NOEXCEPT(noexcept(x2.operator=(std::move(x2))));
}

int main() {
}
