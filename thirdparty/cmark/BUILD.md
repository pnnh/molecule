
源仓库地址：https://github.com/commonmark/cmark.git
链接到子树目录：thirdparty/cmark

### 构建桌面版

先进入thirdparty/cmark目录，然后执行以下命令：

```bash
mkdir build && cd build
# 将安装目录指定为<WORKSPACE>/thirdparty/install以方便引用
cmake .. -DCMAKE_INSTALL_PREFIX=../../install
make
make install

```