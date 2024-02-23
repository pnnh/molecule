
import 'dart:ffi';
import 'dart:io';
import 'dart:ffi' as ffi;
import 'dart:io' show Platform, Directory;

import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:path_provider/path_provider.dart';

Future<DynamicLibrary> openNativeLibrary(String libName) async {
  Directory directory = await getApplicationDocumentsDirectory();
  debugPrint("directory: $directory");
  var libDir = await getLibraryDirectory();
  debugPrint("libDir: $libDir");
  debugPrint("current dir: ${Directory.current}");
  if (Platform.isMacOS || Platform.isIOS) {
    return DynamicLibrary.open('$libName.framework/$libName');
    //return DynamicLibrary.process();
    //return DynamicLibrary.executable();
  }
  if (Platform.isAndroid || Platform.isLinux) {
    return DynamicLibrary.open('lib$libName.so');
  }
  if (Platform.isWindows) {
    return DynamicLibrary.open('$libName.dll');
  }
  throw UnsupportedError('Unknown platform: ${Platform.operatingSystem}');
}

typedef HelloWorldFunc = ffi.Void Function();
typedef HelloWorld = void Function();


void nativeSayHello() async {
  final dylib = await openNativeLibrary("quantum_native");

  final HelloWorld hello = dylib
      .lookup<ffi.NativeFunction<HelloWorldFunc>>('hello_world')
      .asFunction();
  hello();
}
