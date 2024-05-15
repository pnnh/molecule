#include <future>
#include <iostream>

class Work {
 private:
  int value;
 public:
  Work() : value(42) {}

  std::future<int> spawn() {
    return std::async([=, tmp = *this]() -> int {
      return tmp.value;
    });
  }

  std::future<int> spawn2() {
    return std::async([=, *this]() -> int {
      return value;
    });
  }

  std::future<int> spawn3() {
    // [=, this] C++20 功能
    return std::async([=, this]() -> int {
      return value;
    });
  }
};

std::future<int> foo() {
  Work tmp;
  return tmp.spawn();
}

std::future<int> foo3() {
  Work tmp;
  return tmp.spawn2();
}

std::future<int> foo4() {
  Work tmp;
  return tmp.spawn3();
}

int main() {
  std::future<int> f = foo();
  f.wait();
  std::cout << "f.get() = " << f.get() << std::endl;

  auto foo2 = [](auto a) { return a; };
  int three = foo2(3);
  const char* hello = foo2("hello");
  std::cout << three << hello << std::endl;

  std::future<int> f2 = foo3();
  f2.wait();
  std::cout << "f2.get() = " << f2.get() << std::endl;

  std::future<int> f4 = foo4();
  f4.wait();
  std::cout << "f4.get() = " << f4.get() << std::endl;
}