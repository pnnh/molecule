#!/bin/bash

# 当命令执行出错时退出脚本
set -e

# 构建应用
pwd
npm run setup --workspaces
npm run build --workspaces

# 构建镜像
docker build -t polaris-web -f Dockerfile .

# 集成环境重启容器
if [ ${BUILD_ID} ]; then
	docker rm -f polaris-web
    docker run -d --restart=always \
        --name polaris-web \
        -p 8100:8100 \
        -v /opt/services/polaris/web/runtime:/data/runtime \
        polaris-web
fi