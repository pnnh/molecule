#!/bin/bash

# 命令出错时终止脚本
set -e

# 构建应用
pwd
ls -al
mkdir -p build
dotnet restore "Polaris.csproj"
dotnet build "Polaris.csproj" -c Release -o build
mkdir -p publish
dotnet publish "Polaris.csproj" -c Release -o publish

# 构建镜像
docker build -t polaris-server -f Dockerfile .

# 集成环境下重启容器
if [ ${BUILD_ID} ]; then
    docker rm -f polaris-server
    docker run -d --restart=always \
        --name polaris-server \
        -p 8101:8101 \
        -v /opt/services/polaris/server/runtime:/data/runtime \
        polaris-server
fi