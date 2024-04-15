#!/bin/bash

# 当命令执行出错时退出脚本
set -e

# 构建应用
pwd
npm install
npm run build

# 构建镜像
docker build -t polaris-web -f Dockerfile .

# 集成环境重启容器
docker rm -f polaris-web
docker run -d --restart=always \
    --name polaris-web \
    -p 6100:8100 \
    -v /opt/services/polaris/web/.env.local:/data/.env.local \
    polaris-web