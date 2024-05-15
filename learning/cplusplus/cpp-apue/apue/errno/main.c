#include <stdio.h>
#include <errno.h>
#include <libc.h>

// 示例strerror和perror
int main(int argc, char *argv[]) {
  fprintf(stderr, "EACCESS: %s\n", strerror(EACCES));
  errno = ENOENT;
  perror(argv[0]);
  return 0;
}