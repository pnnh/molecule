
#include "lib/services/config/appconfig.h"
#include <cstdio>
#include <cstdlib>
#include <string>

int main() {
  std::string dsn = AppConfig::Default().GetDSN();
  printf("dsn is %s\n", dsn.c_str());

  auto realValue = std::string("xyz");
  if (dsn == realValue) {
    return 0;
  }
  return -1;
}
