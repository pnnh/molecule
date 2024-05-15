import 'dart:convert';

import 'package:flutter/material.dart';
import 'dart:io';

class ChatApp extends StatelessWidget {
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
                        this.get();
                      },
                    )
                  ],
                ),
                Row(
                  children: <Widget>[Text("响应")],
                )
              ],
            )));
  }

  get() async {
    var httpClient = new HttpClient();
    var uri = new Uri.http("localhost:7500", "/chat/say", {"text": "aaa"});
    var request = await httpClient.getUrl(uri);
    var response = await request.close();
    var body = await response.transform(utf8.decoder).join();

    print(body);
  }
}
