#include <iostream>
#include <mutex>

class IntIter {
 public:
  IntIter(int *p) : p_(p) {}
  bool operator!=(const IntIter &other) {
    return (p_ != other.p_);
  }

  const IntIter &operator++() {
    p_++;
    return *this;
  }

  int operator*() const {
    return *p_;
  }

 private:
  int *p_;
};

template<unsigned int fix_size>
class FixIntVector {
 public:
  FixIntVector(std::initializer_list<int> init_list) {
    int *cur = data_;
    for (auto e: init_list) {
      *cur = e;
      cur++;
    }
  }

  IntIter begin() {
    return IntIter(data_);
  }

  IntIter end() {
    return IntIter(data_ + fix_size);
  }

 private:
  int data_[fix_size]{0};
};

bool foo() {
  return true;
}
bool bar() {
  return true;
}

std::mutex mx;
bool shared_flag = true;

int main() {
  FixIntVector<10> fix_int_vector{1, 3, 5, 7, 9};
  for (auto e: fix_int_vector) {
    std::cout << e << std::endl;
  }
  if (bool b = foo(); b) {
    std::cout << std::boolalpha << "good! foo()=" << b << std::endl;
  } else if (bool b1 = bar(); b1) {
    std::cout << std::boolalpha << "foo()=" << b << ", bar()=" << std::endl;
  } else {
    std::cout << std::boolalpha << "bad! foo()=" << b << std::endl;
  }
  if (std::lock_guard<std::mutex> lock(mx); shared_flag) {
    shared_flag = false;
  }

  std::string str;
  if (char buf[10]{0}; std::fgets(buf, 10, stdin)) {
    str += buf;
  }
}