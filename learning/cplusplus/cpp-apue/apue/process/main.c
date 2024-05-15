#include <stdio.h>
#include <sys/wait.h>
#include <string.h>
#include <libc.h>
#include "../../utils/apue.h"

// 可以执行自定义命令
int main(int argc, char *argv[]) {
  printf("hello world from process ID %ld\n", (long)getpid());
  printf("uid = %d, gid = %d\n", getuid(), getgid());

  char buf[MAXLINE];
  pid_t pid;
  int status;

  printf("%% ");
  while (fgets(buf, MAXLINE, stdin) != NULL) {
    if(buf[strlen(buf) - 1] == '\n')
      buf[strlen(buf) - 1] = 0;   /* replace new line with null */

    if ((pid = fork()) < 0) {
      err_quit("fork error");
    } else if (pid == 0) {    /* child */
      execlp(buf, buf, (char *)0);
      err_quit_format("couldn't execute: %s", buf);
      exit(127);
    }

    /* parent */
    if ((pid = waitpid(pid, &status, 0)) < 0)
      err_quit("waitpid error");

    printf("%% ");
  }
  exit(0);
}