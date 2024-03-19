all : release

DIR := $(CURDIR)

setup :
	-mkdir $(DIR)/build
	-mkdir $(DIR)/product

assets : setup
	-cd $(DIR) && cp -r assets product

release : assets
	-cd $(DIR)/build && -cmake -DCMAKE_BUILD_TYPE=Debug -G Ninja .. && -ninja

debug : assets
	-cd $(DIR)/build && -cmake -DCMAKE_BUILD_TYPE=Debug -G Ninja .. && -ninja

image : release
	docker build -f docker/Dockerfile -t dream-kepler:latest .

clean :
	-rm -f ./target