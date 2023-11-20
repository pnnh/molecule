#!/bin/bash

buildApp() {
    pwd
    ls -al
    mkdir -p build
    go mod tidy
    go build -o build/multiverse-authorization
}

buildDocker() {
    pwd
    docker build -t multiverse-authorization -f Dockerfile .
}

restartContainer() {
    docker rm -f multiverse-authorization
    docker run -d --restart=always \
        --name multiverse-authorization \
        -p 8001:8001 \
        -v /opt/services/multiverse/authorization/runtime:/runtime \
        multiverse-authorization
}

buildApp
buildDocker

if [ $BUILD_ID ]; then
	echo "[$BUILD_ID]重启容器"
    restartContainer
fi