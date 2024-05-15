### try use xmake to build c++ 20 module

```shell
# run this cmd to build
# test on ubuntu 22.04 g++ 11
xmake
```

macos下似乎需要手动设置工具链为llvm

```shell
xmake f --toolchain=llvm --sdk=/opt/homebrew/opt/llvm
xmake -v
```