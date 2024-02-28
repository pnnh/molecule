
#include <cstdio>
#include <cstdlib>
#include "quantum.h"

int main() {
    hello_world();
    printf("3 + 5 = %d\n", sum(3, 5));
    int *mult = multiply(3, 5);
    printf("3 * 5 = %d\n", *mult);
    free(mult);
    int sub_num = 3;
    printf("3 - 5 = %d\n", subtract(&sub_num, 5));

    open_database("abc");
    return 0;
}
