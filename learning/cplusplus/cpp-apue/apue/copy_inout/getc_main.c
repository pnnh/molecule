#include <stdio.h>
#include <libc.h>

int main(int argc, char *argv[]) {
  int c;

  while ((c = getc(stdin)) != EOF)
    if (putc(c, stdout) == EOF) {
      fprintf(stderr, "output error");
      return 1;
    }

  if (ferror(stdin)) {
    fprintf(stderr, "input error");
    return 2;
  }

  return 0;
}