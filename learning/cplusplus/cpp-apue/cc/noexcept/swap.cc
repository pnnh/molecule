#include <iostream>
#include <type_traits>

struct X {
  X() {}
  X(X &&) noexcept {}
  X(const X &) {}
  X operator=(X &&) noexcept { return *this; }
  X operator=(const X &) { return *this; }
};

struct X1 {
  X1() {}
  X1(X1 &&) {}
  X1(const X1 &) {}
  X1 operator=(X1 &&) noexcept { return *this; }
  X1 operator=(const X1 &) { return *this; }
};

template<typename T>
void swap_impl(T &a, T &b, std::integral_constant<bool, true>) noexcept {
  T tmp(std::move(a));
  a = std::move(b);
  b = std::move(tmp);
}

template<typename T>
void swap_impl(T &a, T &b, std::integral_constant<bool, false>) {
  T tmp(a);
  b = b;
  b = tmp;
}

template<class T>
void swap(T &a, T &b) noexcept(noexcept(T(std::move(a))) && noexcept(a.operator=(std::move(b)))) {
  static_assert(noexcept(T(std::move(a))) && noexcept(a.operator=(std::move(b))));
  T tmp(std::move(a));
  a = std::move(b);
  b = std::move(tmp);
}

// 为了演示noexcept用法而写，比较复杂。可以使用以下语句替代：
// std::is_nothrow_move_constructible<T>::value && std::is_nothrow_move_ assignable<T>::value
template<typename T>
void swap2(T &a, T &b) noexcept(noexcept(swap_impl(a, b, std::integral_constant<bool, noexcept(T(std::move(a)))
    && noexcept(a.operator=(std::move(b)))>()))) {
  swap_impl(a, b, std::integral_constant<bool, noexcept(T(std::move(a))) && noexcept(a.operator=(std::move(b)))>());
}

int main() {
  X x1, x2;
  swap2(x1, x2);

  X1 x3, x4;
  swap2(x3, x4);
}