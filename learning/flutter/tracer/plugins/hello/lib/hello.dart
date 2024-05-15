import 'dart:async';
import 'dart:html';
import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:flutter_web_plugins/flutter_web_plugins.dart';

class Hello {
//
//  static void registerWith(Registrar registrar) {
//    final MethodChannel _channel = const MethodChannel('hello', const StandardMethodCodec(), registrar.messenger);
//    final Hello instance = Hello();
//    _channel.setMethodCallHandler(instance.handleMethodCall);
//  }
//
//  Future<dynamic> handleMethodCall(MethodCall call) async {
//    switch (call.method) {
//      case 'fetchJson':
//
//        var url = (call.arguments as Map)['url'] as String;
//        print('aaa' + url);
//
//        var b = await HttpRequest.getString(url);
//        //print(b);
//        final c = json.decode(b);
//        //print(c);
//        //print(c["a"]);
//        return c;
//        break;
//      default:
//        throw PlatformException(
//            code: '未实现的方法',
//            details: "The url_launcher plugin for web doesn't implement "
//                "the method '${call.method}'");
//    }
//  }


//  static Future<String> get platformVersion async {
//    final String version = await _channel.invokeMethod('getPlatformVersion');
//    return version;
//  }
}
