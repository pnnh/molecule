#include <iostream>
#include <string>
#include <vector>
#include <thread>
#include <mutex>

struct X {
  thread_local static int i;
};

thread_local X a;
thread_local int tv;
static int sv;

std::mutex g_out_lock;

struct RefCount {
  RefCount(const char *f) : i(0), func(f) {
    std::lock_guard<std::mutex> lock(g_out_lock);
    std::cout << std::this_thread::get_id()
              << "|" << func << " : ctor i(" << i << ")" << std::endl;
  }
  ~RefCount() {
    std::lock_guard<std::mutex> lock(g_out_lock);
    std::cout << std::this_thread::get_id()
              << "|" << func << " : dtor i(" << i << ")" << std::endl;
  }
  void inc() {
    std::lock_guard<std::mutex> lock(g_out_lock);
    std::cout << std::this_thread::get_id()
              << "|" << func << " : ref count add 1 to i(" << i << ")" << std::endl;
    i++;
  }
  int i;
  std::string func;
};

RefCount *lp_ptr = nullptr;

void foo(const char *f) {
  std::string func(f);
  thread_local RefCount tv(func.append("#foo").c_str());
  tv.inc();
}

void bar(const char *f) {
  std::string func(f);
  thread_local RefCount tv(func.append("#bar").c_str());
  tv.inc();
}

void threadfunc1() {
  const char *func = "threadfunc1";
  foo(func);
  foo(func);
  foo(func);
}

void threadfunc2() {
  const char *func = "threadfunc2";
  foo(func);
  foo(func);
  foo(func);
}

void threadfunc3() {
  const char *func = "threadfunc3";
  foo(func);
  bar(func);
  bar(func);
}

int main(int argc, char *argv[]) {
  thread_local X b;

  constexpr int *sp = &sv;  //编译成功
  const int *tp = &tv;    // 编译失败，tv的地址在运行时确定

  std::thread t1(threadfunc1);
  std::thread t2(threadfunc2);
  std::thread t3(threadfunc3);

  t1.join();
  t2.join();
  t3.join();
}
