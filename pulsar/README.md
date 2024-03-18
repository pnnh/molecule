
## 生成native库

```bash
# 配置cmake
cmake --preset macOS
# 生成native库
cmake --build --preset macOS --config Release
# 安装native库到指定目录
cmake --install build/macOS --config Release
```

### 生成Web库

似乎需要将emscripten工具链升级到3.1.55版本以上，否则无法生成typescript定义并且会编译报错
```bash
cmake --preset Web
cmake --build --preset Web --verbose
```