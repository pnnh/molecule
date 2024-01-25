### 添加子树
引用的是master分支，将其作为子树添加到项目中，添加后，项目根目录下会出现quantum/thirdparty/cmark目录，该目录下包含了cmark的所有文件。
```bash
# 在项目根目录下执行
git subtree add --prefix=quantum/thirdparty/cmark https://github.com/commonmark/cmark.git master --squash
```

### 编译构建安装

```bash
# 在项目根目录下执行
cd quantum/thirdparty/cmark
mkdir build
cd build
# 将安装目录设置为quantum/install
cmake .. -DCMAKE_INSTALL_PREFIX=../../../install
make
make install
```