#include <iostream>
#include <tuple>
#include <vector>
#include <map>

std::tuple<int, int> return_multiple_values() {
  return std::make_tuple(11, 7);
}

auto return_multiple_values2() {
  return std::make_tuple(11, 7);
}

struct BindTest {
  int a = 42;
  std::string b = "hello structured binding";
};

int run_main() {

  int x = 0, y = 0;
  std::tie(x, y) = return_multiple_values();
  std::cout << "x=" << x << "y=" << y << std::endl;

  auto[x2, y2] = return_multiple_values2();   // C++17用法
  std::cout << "x2=" << x2 << "y2=" << y2 << std::endl;

  BindTest bt;
  auto[x3, y3] = bt;
  std::cout << "x3=" << x3 << "y3=" << y3 << std::endl;

  std::vector<BindTest> bt2{{11, "hello"}, {7, "c++"}, {42, "world"}};
  for (const auto&[x4, y4]: bt2) {
    std::cout << "x4=" << x4 << "y4=" << y4 << std::endl;
  }
}

int run_main2() {

  BindTest bt;
  const auto[x, y] = bt;

  std::cout << "&bt.a=" << &bt.a << " &x=" << &x << std::endl;
  std::cout << "&bt.b=" << &bt.b << " &y=" << &y << std::endl;
  std::cout << "std::is_same_v<const int, decltype(x)>=" << std::is_same_v<const int, decltype(x)> << std::endl;
  std::cout << "std::is_same_v<const std::string, decltype(y)>="
            << std::is_same_v<const std::string, decltype(y)> << std::endl;
}

class BindBase1 {
 public:
  int a = 42;
  double b = 11.7;
};

class BindTest1 : public BindBase1 {};

class BindBase2 {};

class BindTest2 : public BindBase2 {
 public:
  int a = 42;
  double b = 11.7;
};

class BindBase3 {
 public:
  int a = 42;
};

class BindTest3 : public BindBase3 {
 public:
  double b = 11.7;
};

int run_main4() {
  BindTest1 bt1;
  BindTest2 bt2;
  BindTest3 bt3;

  auto[x1, y1] = bt1;
  auto[x2, y2] = bt2;
  //auto[x3, y3] = bt3;   //编译错误，因为成员变量分别在基类和子类中定义，无法使用结构化绑定
}

int run_main3() {
  int a[3]{1, 3, 5};
  auto[x, y, z] = a;
  std::cout << "[x, y, z]=[" << x << ", " << y << ", " << z << "]" << std::endl;
}

int run_main5() {
  std::map<int, std::string> id2str{{1, "hello"}, {3, "Structured"}, {5, "bindings"}};

  for (const auto &elem: id2str) {
    std::cout << "id=" << elem.first << ", str=" << elem.second << std::endl;
  }
  for (const auto&[id, str]: id2str) {
    std::cout << "id=" << id << ", str=" << str << std::endl;
  }
}

int main(int argc, char *argv[]) {
  BindTest bt;
  auto&[x, y] = bt;

  std::cout << "&bt.a=" << &bt.a << " &x=" << &x << std::endl;
  std::cout << "&bt.b=" << &bt.b << " &y=" << &y << std::endl;

  x = 11;
  std::cout << "bt.a=" << bt.a << std::endl;
  bt.b = "hi structured binding";
  std::cout << "y=" << y << std::endl;

//  auto t = std::make_tuple(42, "hello", "world");
//  int x2 = 0, y2 = 0;
//  std::tie(x2, std::ignore) = t;
//  std::tie(y2, std::ignore) = t;
}
