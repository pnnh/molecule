#include <stdio.h>
#include <libc.h>

char buf1[] = "abcdefghij";
char buf2[] = "ABCDEFGHIJ";

// 图3-2 创建一个具有空洞的文件
int main(void) {
  int fd;

  if ((fd = creat("file.hole", O_RDWR)) < 0) {
    fprintf(stderr, "creat error");
    return 1;
  }

  if (write(fd, buf1, 10) != 10) {
    fprintf(stderr, "buf1 write error");
    return 2;
  }

  /* offset now = 10 */
  if (lseek(fd, 16384, SEEK_SET) == -1) {
    fprintf(stderr, "lseek error");
    return 3;
  }

  /* offset now = 16384 */
  if (write(fd, buf2, 10) != 10) {
    fprintf(stderr, "buf2 write error");
    return 4;
  }
  /* offset now = 16394 */

  exit(0);
}