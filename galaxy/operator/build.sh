#!/bin/bash

# 命令出错时终止脚本
set -e

# 构建应用
pwd
ls -al
mkdir -p build
go mod tidy
go build -o build/galaxy-operator

# 构建镜像
docker build -t galaxy-operator -f Dockerfile .

# 集成环境下重启容器
if [ ${BUILD_ID} ]; then
    docker rm -f galaxy-operator
    docker run -d --restart=always \
        --name galaxy-operator \
        -p 8401:8401 \
        -v /opt/services/galaxy/operator/runtime:/data/runtime \
        galaxy-operator
fi