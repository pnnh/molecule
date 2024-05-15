import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';

class FileApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: "Navigation Basics",
        home: Scaffold(
            backgroundColor: Colors.blue,
            body: Column(
              children: <Widget>[
                Row(
                  children: <Widget>[
                    FlatButton(
                      child: Text("Click"),
                      onPressed: () {
                        this.readFile();
                      },
                    )
                  ],
                )
              ],
            )));
  }

  void readFile() async {
    Directory current = Directory.current;
    print(current.path);
    var stream = File("a.txt").openRead();
    var body = await stream.transform(utf8.decoder).join();
    print(body);
  }
}
