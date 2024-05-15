#include <stdio.h>
#include <sys/wait.h>
#include <string.h>
#include <libc.h>

#define MAXLINE 1024

void err_quit(char *msg) {
  fprintf(stderr, "%s", msg);
  exit(1);
}

void err_quit_format(char *format, char *msg) {
  fprintf(stderr, format, msg);
  exit(1);
}