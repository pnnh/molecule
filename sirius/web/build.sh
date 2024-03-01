#!/bin/bash

# 当命令执行出错时退出脚本
set -e

# 构建应用
pwd
npm run setup
npm run build

# 构建镜像
docker build -t sirius-web -f Dockerfile .

# 集成环境重启容器
if [ ${BUILD_ID} ]; then
	docker rm -f sirius-web
    docker run -d --restart=always \
        --name sirius-web \
        -p 8700:8700 \
        -v /opt/services/sirius/web/.env.production:/data/.env.production \
        sirius-web
fi