#!/bin/bash

# 当命令执行出错时退出脚本
set -e

# 构建应用
pwd
ls -al
npm install
npm run build

# 构建镜像
docker build -t galaxy-web -f Dockerfile .

# 集成环境重启容器
if [ ${BUILD_ID} ]; then
	docker rm -f galaxy-web
    docker run -d --restart=always \
        --name galaxy-web \
        -p 8400:8400 \
        -v /opt/services/galaxy/web/runtime:/data/runtime \
        galaxy-web
fi