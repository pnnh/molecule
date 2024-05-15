一个尝试用C++实现的服务接口程序

## 依赖

通过以下命令安装依赖包，Ubuntu 22.04环境，需预先安装并配置vcpkg


### 通过包管理工具安装

```shell
# 安装boost
sudo apt install libboost-all-dev
# 安装postgresql数据库程序
sudo apt install libpq libpqxx
# 安装Facebook folly工具库
vcpkg install folly
# 安装日志库
vcpkg install sdplog
# 安装模板库
vcpkg install inja
# 安装JSON库，一般安装inja时会作为依赖被自动安装
vcpkg install nlohmann-json
```

### 需手动安装

|  程序库   | 源码地址  | 标签  | 
|  ----  | ----  | ---- |
| multimarkdown  | https://github.com/fletcher/MultiMarkdown-6.git | 6.6.0 |
| aws-sdk-cpp  | https://github.com/aws/aws-sdk-cpp.git | 1.9.315 |


因依赖aws-sdk-cpp，所以需要参考官网教程手动安装

注意：无法通过vcpkg安装aws-sdk-cpp库，功能不全，需手动编译安装


## 构建

### Debug构建
```shell
# 执行配置
cmake --preset Debug
# 执行构建
cmake --build --preset Debug
```

### Release构建
```shell
# 执行配置
cmake --preset Release
# 仅构建
cmake --build --preset Release
# 构建并安装
cmake --build --preset Release --target install
```

## 生成docker镜像

先构建完成并安装，将会生成docker/release目录，里面包含运行时文件

```shell
# 复制资产到docker目录
cp -r assets docker
cd docker
sudo docker build -f Dockerfile -t dream-kepler:latest .
# 测试执行构建的镜像
sudo docker run -p 8090:8080 dream-kepler
# 仅在本地测试时使用，将aws凭证文件挂载到docker容器
sudo docker run -p 8090:8080 -v $HOME/.aws/credentials:/root/.aws/credentials:ro dream-kepler
```

