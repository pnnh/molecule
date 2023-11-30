import 'dart:async';
import 'dart:ffi';
import 'dart:io';
import 'dart:ui' as ui;

import 'package:ffi/ffi.dart';
import 'package:flutter/services.dart';

import 'quantum_bindings_generated.dart';

const String _libName = 'QuantumNative';

final DynamicLibrary _dylib = () {
  if (Platform.isMacOS || Platform.isIOS) {
    return DynamicLibrary.open('$_libName.framework/$_libName');
  }
  if (Platform.isAndroid || Platform.isLinux) {
    return DynamicLibrary.open('lib$_libName.so');
  }
  if (Platform.isWindows) {
    return DynamicLibrary.open('$_libName.dll');
  }
  throw UnsupportedError('Unknown platform: ${Platform.operatingSystem}');
}();

final HelloFfiBindings _bindings = HelloFfiBindings(_dylib);

int sum(int a, int b) => _bindings.sum(a, b);

int openDatabase(String path) {
  final fooNative = path.toNativeUtf8().cast<Char>();
  return _bindings.open_database(fooNative);
}

class Quantum {
  static const MethodChannel _channel = MethodChannel('quantum');

  static Future<String?> get platformVersion async {
    final String? version = await _channel.invokeMethod('getPlatformVersion');
    return version;
  }

  static Future<ui.Size> windowSize() async {
    final ui.Size size = await _channel.invokeMethod('windowSize');
    return size;
  }

  static Future<String> randomString(
      {int length = 16,
      bool hasNumber = true,
      bool hasLetter = true,
      bool hasUppercaseLetter = true,
      bool hasSymbol = false}) async {
    final String version = await _channel.invokeMethod('randomString');
    return version;
  }

  static Future<String> initPlugin({String resUrl = ""}) async {
    return await _channel.invokeMethod('initPlugin', {"resUrl": resUrl});
  }

  // static void openUrl(Uri url) {
  //   if (kIsWeb) {
  //     QuantumWeb.openUrl(url);
  //     return;
  //   }
  //   throw UnimplementedError();
  // }
}
