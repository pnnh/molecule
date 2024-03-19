本服务代码在ubuntu 23.10 x86环境下开发与测试

大多数第三方库通过系统apt包管理系统安装，少量系统需要自己手动下载编译并安装

### 依赖的系统包列表

#### libboost-all-dev
boost基础库，用于基本功能

#### libworkflow-dev
搜狗开源的一个C++异步框架，暂用到未

### 需手动安装的第三方库列表

一般会先下载到~/Library目录下，之后再手动编译并安装

#### Qt
用到了一些Qt的基础组库件，使方式用是手动下载Qt社区版，并指定CMake引地址用

#### Oat++

安装过程

```bash
$ git clone https://github.com/oatpp/oatpp.git
$ cd oatpp/

$ mkdir build && cd build

$ cmake ..
$ make install
```

#### MultiMarkdown-6

安装过程

```bash
$ git clone https://github.com/fletcher/MultiMarkdown-6.git
$ cd MultiMarkdown-6
$ mkdir build && cd build
$ cmake ..
$ make
$ make install
```

#### Facebook folly

安装过程

folly仓库说明官方不提供兼容性保证，建议安装到临时目录。但是该种方式不方便引用，所以此处采用的是直接cmake构建安装的方式。

而没有采用官方的getdeps.py构建脚本。仅仅用它来获取依赖的系统包。

同时在cmake编译时指定了安装前缀为/opt目录

```bash
# 获取代码，默认采用主分支
git clone https://github.com/facebook/folly
cd folly
# 获取依赖
sudo ./build/fbcode_builder/getdeps.py install-system-deps --recursive
# 构建
# python3 ./build/fbcode_builder/getdeps.py --allow-system-packages build
mkdir output && cd output
cmake -DCMAKE_INSTALL_PREFIX=/opt ..
make
make install
```

#### inja

安装过程

```bash
git clone https://github.com/pantor/inja.git
cd inja
git checkout v3.4.0  # 安装指定版本
mkdir build && cd build
cmake -DCMAKE_INSTALL_PREFIX=/opt ..  # 安装到/opt目录
sudo make install
```