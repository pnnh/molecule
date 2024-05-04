#include "CxxTest.h"
#include <iostream>

int cxxFunction(int n)
{
    std::cout << "C++ function called with " << n << std::endl;
    return n * 3;
}