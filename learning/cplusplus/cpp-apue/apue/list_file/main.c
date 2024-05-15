#include <stdio.h>
#include <dirent.h>

int main(int argc, char *argv[]) {
  printf("hello %s\n", "world");

  DIR *dp;
  struct dirent *dirp;

  if (argc != 2) {
    return 1;
  }

  if ((dp = opendir(argv[1])) == NULL) {
    fprintf(stderr, "can't open %s", argv[1]);
    return 2;
  }

  while((dirp = readdir(dp)) != NULL) {
    printf("%s\n", dirp->d_name);
  }

  closedir(dp);
  return 0;
}