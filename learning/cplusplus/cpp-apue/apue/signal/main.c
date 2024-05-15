#include "../../utils/apue.h"
#include <sys/wait.h>

static void sig_int(int);

// 可以执行自定义命令
int main(int argc, char *argv[]) {
  char buf[MAXLINE];
  pid_t pid;
  int status;

  // 可以通过kill -2 pid命令来发送此信号
  if (signal(SIGINT, sig_int) == SIG_ERR) {
    err_sys("signal error");
  }

  printf("%% ");
  while (fgets(buf, MAXLINE, stdin) != NULL) {
    if (buf[strlen(buf) - 1] == '\n')
      buf[strlen(buf) - 1] = 0;   // replace new line with null

    if ((pid = fork()) < 0) {
      err_sys("fork error");
    } else if (pid == 0) {  // child
      execlp(buf, buf, (char *)0);
      err_ret("couldn't execute: %s", buf);
      exit(127);
    }
    printf("child process id: %d\n", pid);

    // parent
    if ((pid = waitpid(pid, &status, 0)) < 0)
      err_sys("waitpid error");

    printf("child process stop: %d\n", pid);

    printf("%% ");
  }
  exit(0);
}

void sig_int(int signo) {
  printf("interrupt %d \n%% ", signo);
}