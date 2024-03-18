
## 生成native库

```bash
# 配置cmake
cmake --preset macOS
# 生成native库
cmake --build --preset macOS --config Release
# 安装native库到指定目录
cmake --install build/macOS --config Release
```
