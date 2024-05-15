import 'dart:convert';
import 'dart:html';
import 'dart:js';

import 'package:flutter/material.dart';

class TreeApp extends StatelessWidget {
  final SpanView spanView = SpanView(span: Span('/Say'), children: [
    SpanView(span: Span('GetUserInfo'), children: [
      SpanView(span: Span('Redis')),
      SpanView(span: Span('Database'))
    ]),
    SpanView(span: Span('/SendGift')),
  ]);

  get() async {
    var req = await HttpRequest.getString("http://localhost:6609/searchByTraceId3");

    print('ssss' + req);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: '哈哈哈哈哈',
        debugShowCheckedModeBanner: false,
        home: Scaffold(
            body: Container(
                padding: EdgeInsets.all(15),
                child: Column(
                  children: <Widget>[
                    MaterialButton(
                      child: Text("ssssss"),
                      onPressed: () {
                        print('aaaaaaa');
                        var ab = this.get();
                      },
                    ),
                    TreeNode(
                      spanView: spanView,
                    )
                  ],
                ))));
  }
}

class TreeNodeState extends State<TreeNode> {
  TreeNodeState() {
    print('ssss');
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> subNodes = [];

    if (widget.spanView.children != null) {
      subNodes = widget.spanView.children.map((SpanView sv) {
        return TreeNode(spanView: sv);
      }).toList();
    }
//
//    final List<Widget> divided = ListTile.divideTiles(
//      context: context,
//      tiles: tiles,
//    ).toList();

    return DecoratedBox(
      decoration: const BoxDecoration(color: Colors.blue),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(widget.spanView.span.action,
              style: TextStyle(backgroundColor: Colors.amberAccent),
              textAlign: TextAlign.left),
          Container(
              padding: EdgeInsets.only(left: 15),
              child: DecoratedBox(
                  decoration: const BoxDecoration(color: Colors.green),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: subNodes,
                  )))
        ],
      ),
    );
  }
}

class TreeNode extends StatefulWidget {
  final SpanView spanView;

  TreeNode({Key key, this.spanView}) : super(key: key);

  @override
  TreeNodeState createState() => TreeNodeState();
}

class Span {
  String action;

  Span(String action) {
    this.action = action;
  }
}

class SpanView {
  SpanView({this.span, this.children}) {
    print(this.children == null);
    if (this.children == null) {
      this.children = [];
    }
  }

  Span span;
  List<SpanView> children = [];

//  SpanView(Span span) {
//    this.span = span;
//  }
}
