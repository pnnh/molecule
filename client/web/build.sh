#!/bin/bash

buildApp() {
    pwd
    ls -al
    npm install
    npm run build
}

buildDocker() {
    pwd
    docker build -t multiverse-web -f Dockerfile .
}

restartContainer() {
    docker rm -f multiverse-web
    docker run -d --restart=always \
        --name multiverse-web \
        -p 8000:8000 \
        -v /opt/services/multiverse/web/runtime:/runtime \
        multiverse-web
}

buildApp
buildDocker

if [ $BUILD_ID ]; then
	echo "[$BUILD_ID]重启容器"
    restartContainer
fi
