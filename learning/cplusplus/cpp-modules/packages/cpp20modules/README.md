
```makefile
.PHONY : all
all : main

main : helloworld
	clang++ -std=c++2a -stdlib=libc++ -fprebuilt-module-path=bin main.cpp helloworld.cpp -o bin/main

helloworld :
	clang++ -std=c++2a -c helloworld.cpp -Xclang -emit-module-interface -o bin/helloworld.pcm

.PHONY : clean
clean :
	-rm -r ./bin
```