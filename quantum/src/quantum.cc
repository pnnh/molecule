#include "quantum.h"
#include <iostream>

int open_database(const char* path) {
    std::cerr << "收到了：" << path << std::endl;
    return 0;
}

void hello_world()
{
    std::cerr << "Hello CPP" << std::endl;
    printf("Hello World\n");
}