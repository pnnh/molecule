#include <iostream>
#include "../cpplib/include/cpplib.h"
#include "../clib/include/hello.h"

int main() {
  std::cout << HelloFromC() << std::endl;

  std::cout << HelloFromCpp() << std::endl;

  return 0;
}