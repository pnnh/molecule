#include <map>
#include <string>

template<class T>
using int_map = std::map<int, T>;

template<class T>
struct int_map2 {
  typedef std::map<int, T> type;
};

template<class T>
struct X {
  typename int_map<T>::type int2other;  // 必须带typename关键字
  int_map<T> int2other2;    // 和上面一行比方便一点
};

int main() {
  int_map<std::string> int2string;
  int2string[11] = "7";

  int_map2<std::string>::type int2string2;
  int2string2[11] = "7";
}