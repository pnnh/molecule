#!/bin/bash

# 命令出错时终止脚本
set -e

# 构建应用
pwd
ls -al
mkdir -p build
dotnet restore "Venus.csproj"
dotnet build "Venus.csproj" -c Release -o build
mkdir -p publish
dotnet publish "Venus.csproj" -c Release -o publish

# 构建镜像
docker build -t venus-server -f Dockerfile .

# 集成环境下重启容器
if [ ${BUILD_ID} ]; then
    docker rm -f venus-server
    docker run -d --restart=always \
        --name venus-server \
        -p 8101:8101 \
        -v /opt/services/venus/server/runtime:/data/runtime \
        venus-server
fi