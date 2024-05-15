#include <stdio.h>
#include <libc.h>
#include <fcntl.h>

// 图3-11 对于指定的描述符打印文件标志
int main(int argc, char *argv[]) {
  int val;
  char *ptr;

  if (argc != 2) {
    fprintf(stderr, "usage: a.out <descriptor#>\n");
    return 1;
  }

  if ((val = fcntl((int)strtol(argv[1], &ptr, 10), F_GETFL, 0)) < 0) {
    fprintf(stderr, "fcntl error for fd %d", (int)strtol(argv[1], &ptr, 10));
    return 2;
  }

  switch (val & O_ACCMODE) {
    case O_RDONLY:
      printf("read only");
      break;
    case O_WRONLY:
      printf("write only");
      break;
    case O_RDWR:
      printf("read write");
      break;
    default:
      fprintf(stderr, "unknown access mode");
      return 3;
  }

  if (val & O_APPEND)
    printf(", append");
  if (val & O_NONBLOCK)
    printf(", nonblocking");
  if (val & O_SYNC)
    printf(", synchronous writes");

#if !defined(_POSIX_C_SOURCE) && defined(O_FSYNC) && (O_FSYNC != O_SYNC)
  if (val & O_FSYNC)
    printf(", synchronous writes");
#endif

  putchar('\n');
  exit(0);
}

// ./file_fdflag 0 < /dev/tty
// ./file_fdflag 1 > temp.foo
// ./file_fdflag 2 2>>temp.foo
// ./file_fdflag 5 5<>temp.foo