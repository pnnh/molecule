#!/bin/bash

# 当命令执行出错时退出脚本
set -e

# 构建应用
pwd
npm install
npm run build

# 构建镜像
docker build -t multiverse-web -f Dockerfile .

# 集成环境重启容器
docker rm -f multiverse-web
docker run -d --restart=always \
    --name multiverse-web \
    -p 6000:8000 \
    -v /opt/services/multiverse/web/runtime:/data/runtime multiverse-web