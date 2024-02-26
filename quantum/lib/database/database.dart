import 'dart:ffi' as ffi;
import 'dart:ffi';
import 'dart:io' show Platform, Directory;
import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';

typedef HelloWorldFunc = ffi.Void Function();
typedef HelloWorld = void Function();

class QADatabase {
  static final QADatabase instance = QADatabase('quantum_native');

  late final HelloWorld _helloWorld;

  QADatabase(String libName) {
    var dylib = _openNativeLibrary(libName);
    _helloWorld = dylib
        .lookup<ffi.NativeFunction<HelloWorldFunc>>('hello_world')
        .asFunction();
  }

  DynamicLibrary _openNativeLibrary(String libName) {
    debugPrint("current dir: ${Directory.current}");
    if (Platform.isMacOS || Platform.isIOS) {
      return DynamicLibrary.process();
    }
    if (Platform.isAndroid || Platform.isLinux) {
      return DynamicLibrary.open('lib$libName.so');
    }
    if (Platform.isWindows) {
      return DynamicLibrary.open('$libName.dll');
    }
    throw UnsupportedError('Unknown platform: ${Platform.operatingSystem}');
  }

  void pluginSayHello() {
    _helloWorld();
  }
}
