#include <printf.h>
#include "../clib/include/hello.h"
#include "../cpplib/include/cpplib.h"

int main() {
  printf("%s", HelloFromC());
  printf("%s", HelloFromCpp());
}