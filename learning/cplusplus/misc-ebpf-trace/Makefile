all : container

setup :
	-mkdir out

image :
	cd docker && docker build -t ebpf-trace-dev:1.0 -f ./Dockerfile.devenv .

container : image
	docker run -d --name ebpf-trace-dev -p 2022:22 ebpf-trace-dev:1.0

rm :
	docker rm -f ebpf-trace-dev

bpf : setup
	clang -O2 -target bpf -c src/bpf_program.c -o out/bpf_program.o

loader : setup
	clang -o out/loader -l elf -c src/loader.c


clean :
	-rm -rf ./build