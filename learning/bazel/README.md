
### 生成customrule:hello目标

```bash
bazel build --sandbox_debug --verbose_failures //customrule:hello
```

### 生成make:hello目标
经过测试，在mac m1环境下，go被安装在/opt/homebrew目录下
当构建时，沙箱环境找不到go命令
仅仅在linux环境下测试通过，此时go是通过apt安装的，go可执行文件在/usr/bin目录下

```bash
bazel build --sandbox_debug --verbose_failures //makerule:hello
```