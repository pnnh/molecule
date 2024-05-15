all : state1
.PHONY : all

state1 :
	cd stage1 && bazel build //main:hello-world

.PHONY : clean
clean :
	-rm -r stage1/bazel-*