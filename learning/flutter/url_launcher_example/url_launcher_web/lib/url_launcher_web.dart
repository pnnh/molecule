import 'dart:async';
import 'dart:html' as html;

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
        final String url = call.arguments['url'];
        return _launch(url);
      default:
        throw PlatformException(
            code: 'Unimplemented',
            details: "The url_launcher plugin for web doesn't implement "
                "the method '${call.method}'");
    }
  }


  bool _launch(String url) {
    return html.window.open(url, '') != null;
  }
}
