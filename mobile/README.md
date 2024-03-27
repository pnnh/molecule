flutter示例程序

## 在web时选择渲染引擎

详细参考以下链接：https://docs.flutter.dev/development/tools/web-renderers

```shell
flutter run -d chrome --web-renderer html
flutter build web --release --web-renderer auto --dart-define=FLUTTER_WEB_CANVASKIT_URL=canvaskit/  
flutter build web --release --web-renderer html
```

## 生成模型

```shell
flutter pub run build_runner build
flutter pub run build_runner build --delete-conflicting-outputs
```

### web运行注意


```bash
flutter run -d chrome --web-hostname=127.0.0.1 --web-port=3500
```