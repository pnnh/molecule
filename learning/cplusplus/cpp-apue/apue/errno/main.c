#include <errno.h>
#include <stdio.h>
#include <string.h>

// 示例strerror和perror
int main(int argc, char *argv[]) {
  fprintf(stderr, "EACCESS: %s\n", strerror(EACCES));
  errno = ENOENT;
  perror(argv[0]);
  return 0;
}