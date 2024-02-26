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


int sum(int a, int b)
{
    return a + b;
}

int *multiply(int a, int b)
{
    // Allocates native memory in C.
    int *mult = (int *)malloc(sizeof(int));
    *mult = a * b;
    return mult;
}

void free_pointer(int *int_pointer)
{
    // Free native memory in C which was allocated in C.
    free(int_pointer);
}

int subtract(int *a, int b)
{
    return *a - b;
}
