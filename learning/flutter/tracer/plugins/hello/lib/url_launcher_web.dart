import 'dart:async';
import 'dart:html';
import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:flutter_web_plugins/flutter_web_plugins.dart';

class UrlLauncherPlugin {
  static void registerWith(Registrar registrar) {
    final MethodChannel channel = MethodChannel(
        'plugins.flutter.io/url_launcher',
        const StandardMethodCodec(),
        registrar.messenger);
    final UrlLauncherPlugin instance = UrlLauncherPlugin();
    channel.setMethodCallHandler(instance.handleMethodCall);
  }

  Future<dynamic> handleMethodCall(MethodCall call) async {
    switch (call.method) {
      case 'launch':
        if (call.arguments is Map) {
          var arguments = call.arguments as Map;
          final String url = arguments['url'] as String;
          return _launch(url);
        } else {
          print('无效类型');
        }
        print(call.arguments);
        break;
      case 'get':
        var url = (call.arguments as Map)['url'] as String;
        print('aaa' + url);

        var b = await HttpRequest.getString(url);
        print(b);
        final c = json.decode(b);
        print(c);
        print(c["a"]);
        break;
      case 'fetchJson':

        var url = (call.arguments as Map)['url'] as String;
        print('aaa' + url);

        var b = await HttpRequest.getString(url);
        //print(b);
        final c = json.decode(b);
        //print(c);
        //print(c["a"]);
        return c;
        break;
      default:
        throw PlatformException(
            code: '未实现的方法',
            details: "The url_launcher plugin for web doesn't implement "
                "the method '${call.method}'");
    }
  }


  bool _launch(String url) {
    return window.open(url, '') != null;
  }
}
