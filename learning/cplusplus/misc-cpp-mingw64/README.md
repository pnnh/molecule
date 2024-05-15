尝试在macOS下交叉编译Windows程序

在CLion中测试

通过以下命令安装工具链

```
brew install mingw-w64
```

需要指定以下cmake参数
```shell
-DCMAKE_TOOLCHAIN_FILE=./toolchains/mingw-w64-x86_64.cmake
```
