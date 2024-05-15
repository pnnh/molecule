#include <stdio.h>
#include <libc.h>

#define BUFFSIZE 4096

int main(int argc, char *argv[]) {
  ssize_t n;
  char buf[BUFFSIZE];

  while ((n = read(STDIN_FILENO, buf, BUFFSIZE)) > 0) {
    if (write(STDOUT_FILENO, buf, n) != n) {
      fprintf(stderr, "write error");
      return 1;
    }
  }

  if (n < 0) {
    fprintf(stderr, "read error");
    return 1;
  }

  return 0;
}