import 'dart:async';
import 'dart:html';
import 'dart:js_util';

import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter_web_plugins/flutter_web_plugins.dart';
import 'package:quantum/web/random.dart';

/// A web implementation of the Quantum plugin.
class QuantumWeb {
  static void registerWith(Registrar registrar) {
    // 把JS文件注入进去
    // ToDo 自动注入是不是不太好？
    appendScript();
    final MethodChannel channel = MethodChannel(
      'quantum',
      const StandardMethodCodec(),
      registrar,
    );

    final pluginInstance = QuantumWeb();
    channel.setMethodCallHandler(pluginInstance.handleMethodCall);
  }

  Future<dynamic> handleMethodCall(MethodCall call) async {
    switch (call.method) {
      case 'getPlatformVersion':
        return getPlatformVersion();
      case 'randomString':
        return randomString(16, true, true, true, true);
      case 'getFontName':
        return getFont2();
      case 'windowSize':
        return windowSize();
      case 'initPlugin':
        return initPlugin(call);
      default:
        throw PlatformException(
          code: 'Unimplemented',
          details: 'quantum for web doesn\'t implement \'${call.method}\'',
        );
    }
  }

  Future<String> getPlatformVersion() {
    final version = window.navigator.userAgent;
    return Future.value(version);
  }

  Future<String> getFont2() async {
    var fontName = "WenQuanYi Micro Hei Light";
    var blob = getFontData2(fontName);
    var myVar = await promiseToFuture(blob);

    var completer = Completer<String>();

    var r = FileReader();
    r.onLoadEnd.listen((e) {
      var data = r.result;
      print("data.runtimeType ${data.runtimeType}");
      var u8list = data as Uint8List;
      var byteData = ByteData.view(u8list.buffer);
      var byteDataFuture = Future(() => byteData);
      final FontLoader font = FontLoader(fontName);
      font.addFont(byteDataFuture);
      font.load().then(
        (value) {
          print("font load complete: $fontName");
          completer.complete(fontName);
        },
      );
    });
    r.readAsArrayBuffer(myVar);

    print("fontdatalist: ${blob} ==== ${myVar} ====");
    // Uint8List image = Base64Codec().decode(blob); // image is a Uint8List
    // print("fontdatalist: ${image}");
    //Codec<String, String> stringToBase64Url = utf8.fuse(base64Url);
    // var u8list = base64Decode(myVar);
    // //var u8list = base64Url.decode(myVar);
    // var byteData = ByteData.view(u8list.buffer);
    // var byteDataFuture = Future(() => byteData);
    // final FontLoader font = FontLoader(fontName);
    // font.addFont(byteDataFuture);
    // await font.load();

    //return fontName;
    return completer.future;
  }

  String initPlugin(MethodCall call) {
    String resUrl = call.arguments != null ? call.arguments["resUrl"] : "";
    debugPrint("arguments: $resUrl ${call.arguments}");

    document.head!.append(ScriptElement()
      ..src = resUrl
      ..type = 'module'
      ..defer = false);

    return "";
  }

  static String appendScript() {
    String resUrl = "/assets/packages/quantum/web/dist/index.js";
    if (kDebugMode) {
      resUrl = "http://127.0.0.1:3000/dist/index.js";
    }

    document.head!.append(ScriptElement()
      ..src = resUrl
      ..type = 'module'
      ..defer = false);
    return "";
  }

  static void openUrl(Uri url) {
    window.location.href = url.toString();
  }

  Size windowSize() {
    var width = window.screen?.width ?? 1400;
    var height = window.screen?.height ?? 900;
    return Size(width.toDouble(), height.toDouble());
  }
}
