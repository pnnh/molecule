#!/bin/bash

# 当命令执行出错时退出脚本
set -e

# 构建应用
pwd
npm run setup
npm run build

# 构建镜像
docker build -t huable-web -f Dockerfile .

# 集成环境重启容器
if [ ${BUILD_ID} ]; then
	docker rm -f huable-web
    docker run -d --restart=always \
        --name huable-web \
        -p 8800:8800 \
        -v /opt/services/huable/web/runtime:/data/runtime \
        huable-web
fi