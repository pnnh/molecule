flutter示例程序

## 在web时选择渲染引擎

详细参考以下链接：https://docs.flutter.dev/development/tools/web-renderers

```shell
flutter run -d chrome --web-renderer html
flutter build web --release --web-renderer auto --dart-define=FLUTTER_WEB_CANVASKIT_URL=canvaskit/  
flutter build web --release --web-renderer html
```

在本地模拟生产环境资源托管

```shell
cd dist
http-server --cors
```

## 手动进行brotli压缩

```shell
npm i -g brotli-cli   # 安装压缩工具
brotli-cli compress canvaskit.wasm
```

## 生成模型

```shell
flutter pub run build_runner build
flutter pub run build_runner build --delete-conflicting-outputs
```

## 设置flutter web监听地址和端口

需要修改地址和端口，否则会有一些跨域问题

```shell
flutter run -d web-server --web-hostname 127.0.0.1 --web-port 3500
```

## 运行程序

```shell
# 打开chrome程序运行
flutter run -d chrome --web-hostname 127.0.0.1 --web-port 3500
# 运行web服务器
flutter run -d web-server
```