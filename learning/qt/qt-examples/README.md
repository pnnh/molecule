qt6示例项目，不支持qt5

mac下编译测试过

需指定以下cmake定义变量

```shell
-GNinja -DCMAKE_PREFIX_PATH=~/Qt/6.2.0/macos/lib/cmake
```

需要安装ninja构建工具，替代make

开发工具采用CLion和Qt Creator
