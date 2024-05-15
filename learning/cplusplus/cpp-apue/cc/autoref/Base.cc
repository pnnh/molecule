//
// Created by Larry on 2022/1/2.
//

#include "Base.h"
#include <iostream>

void Base::f() {
  std::cout << "Base::f()" << std::endl;
}

void Derived::f() {
  std::cout << "Derived::f()" << std::endl;
}