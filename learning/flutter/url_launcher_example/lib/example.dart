import 'package:url_launcher/url_launcher.dart';
import 'package:flutter/material.dart';
import 'dart:ui';

class UrlLauncherExample extends StatelessWidget {
  static const String _title = 'URL Launcher Example';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _title,
      home: Scaffold(
        appBar: AppBar(title: const Text(_title)),
        body: LaunchButton(),
      ),
    );
  }
}

class LaunchButton extends StatelessWidget {
  LaunchButton({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: RaisedButton(
        onPressed: _launch,
        child: Text(
          'Launch!',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }

  void _launch() {
    launch('https://www.google.com');
  }
}
