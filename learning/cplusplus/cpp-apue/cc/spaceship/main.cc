#include <iostream>
#include <compare>

struct B {
  int a;
  long b;
  auto operator<=>(const B &) const = default;
};

struct D : B {
  short c;
  auto operator<=>(const D &) const = default;
};

int ci_compare(const char *s1, const char *s2) {
  while (tolower(*s1) == tolower(*s2++)) {
    if (*s1++ == '\0') {
      return 0;
    }
  }
  return tolower(*s1) - tolower(*--s2);
}

class CIString {
 public:
  CIString(const char *s) : str_(s) {}

  std::weak_ordering operator<=>(const CIString &b) const {
    return ci_compare(str_.c_str(), b.str_.c_str()) <=> 0;
  }

 private:
  std::string str_;
};

struct D2 : B {
  CIString c{""};
  auto operator<=>(const D2 &) const = default;
};

int main() {
  bool b = 7 <=> 11 < 0;    // b == true
  std::cout << typeid(decltype(7 <=> 11)).name() << std::endl;

  D x1, x2;
  std::cout << typeid(decltype(x1 <=> x2)).name() << std::endl;

  CIString s1{"HELLO"}, s2{"hello"};
  std::cout << (s1 <=> s2 == 0);    // 输出为true

  D2 w1, w2;
  std::cout << typeid(decltype(w1 <=> w2)).name() << std::endl;
}