import 'package:flutter/material.dart';
import 'dart:async';

import 'package:flutter/services.dart';
import 'package:quantum/quantum.dart' as quantum;
import 'package:quantum_example/utils.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String _platformVersion = 'Unknown';
  String _randomString = "";
  late int sumResult;

  @override
  void initState() {
    super.initState();
    initPlatformState();
    sumResult = quantum.sum(1, 2);
  }

  // Platform messages are asynchronous, so we initialize in an async method.
  Future<void> initPlatformState() async {
    String platformVersion;
    // Platform messages may fail, so we use a try/catch PlatformException.
    // We also handle the message potentially returning null.
    try {
      platformVersion =
          await quantum.Quantum.platformVersion ?? 'Unknown platform version';
    } on PlatformException {
      platformVersion = 'Failed to get platform version.';
    }

    // If the widget was removed from the tree while the asynchronous platform
    // message was in flight, we want to discard the reply rather than calling
    // setState to update our non-existent appearance.
    if (!mounted) return;

    setState(() {
      _platformVersion = platformVersion;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          appBar: AppBar(
            title: const Text('Plugin example app'),
          ),
          body: Column(children: [
            SizedBox(
              child: Text('randomString: $_randomString'),
            ),
            SizedBox(
              child: Text('Running on: $_platformVersion\n'),
            ),
            SizedBox(
              child: Text('quantum sum is: $sumResult\n'),
            ),
            SizedBox(
                child: TextButton(
                    child: Text('Click'),
                    onPressed: () async {
                      // var randomString = await quantum.Quantum.randomString();
                      // setState(() {
                      //   _randomString = randomString;
                      // });
                      var fullPath = await getDatabaseFullPath();
                      var dbResult = quantum.openDatabase(fullPath);
                      debugPrint("dbResult: $dbResult");
                    }))
          ])),
    );
  }
}
