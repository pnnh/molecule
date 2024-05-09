#!/bin/bash

# 命令出错时终止脚本
set -e

# 构建应用
pwd
mkdir -p build
go mod tidy
go build -o build/multiverse-authorization

# 构建镜像
docker build -t multiverse-authorization -f Dockerfile .

# 集成环境下重启容器
docker rm -f multiverse-authorization
docker run -d --restart=always \
    --name multiverse-authorization \
    -p 6001:8001 \
    -v /opt/services/multiverse/authorization/runtime:/data/runtime \
    multiverse-authorization