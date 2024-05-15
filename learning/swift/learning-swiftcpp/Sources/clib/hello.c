//
//  hello.cpp
//
//  Created by Larry on 2019/6/18.
//  Copyright © 2019 larry. All rights reserved.
//

#include <printf.h>
#include "include/hello.h"

char* HelloFromC() {
  printf("Hello from c\n");
  return "Return from c\n";
}