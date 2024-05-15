import 'dart:html';

import 'package:fixnum/fixnum.dart';
import 'package:flutter/material.dart';
import 'package:tikes/protocol/slave/slave.pb.dart';

class ClientApp extends StatefulWidget {
  @override
  ClientAppState createState() => ClientAppState();
}

class ClientAppState extends State<ClientApp> {
  String respText = "";

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: Scaffold(
        body: Container(
          child: Column(
            children: <Widget>[
              Row(
                children: <Widget>[
                  FlatButton(
                    child: Text(
                      "拉取消息",
                      textDirection: TextDirection.ltr,
                    ),
                    onPressed: () {
                      sayFunc(context);
                    },
                  )
                ],
              ),
              Row(
                children: <Widget>[
                  Text(
                    respText,
                    textDirection: TextDirection.ltr,
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  sayFunc(BuildContext context) async {
    var info = UserInfoRequest.create();
    info.id = 1 as Int64;

    var list = info.writeToBuffer();

    var url = "http://localhost:7500/chat/say";

    var b = await HttpRequest.getString(url);
    print(b);
    print('fdsfdfds');

    setState(() {
      this.respText = b;
    });
    //final c = json.decode(b);
    //print(c);
    //print(c["a"]);
  }
}
