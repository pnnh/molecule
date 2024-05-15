import 'package:flutter/material.dart';

class WriterApp extends StatefulWidget {
  @override
  WriterAppState createState() => new WriterAppState();
}

class WriterAppState extends State<WriterApp> {
  final List widgets = [1, 2, 3];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "sss",
      debugShowCheckedModeBanner: false,
      home: Scaffold(
          appBar: AppBar(title: const Text("模拟编辑器")),
          body: Container(
            margin: const EdgeInsets.all(10),
            child: Column(
              children: <Widget>[
                Container(child: toolBar()),
                Expanded(
                  child: Scrollbar(
                      child: ListView.builder(
                    itemBuilder: (BuildContext context, int index) {
                      print("xxxx " + index.toString());
                      // var val = this.widgets[index];
                      //return Text("aaa", style: TextStyle(fontSize: (20 + val * 2).toDouble()),);
                      return Text(
                        "aaa",
                        style: TextStyle(fontSize: 20),
                      );
                    },
                    itemCount: this.widgets.length,
                  )),
                )
              ],
            ),
          )),
    );
  }

  Widget getTextWidgets() {
    List<Widget> list = new List<Widget>();
    for (var i = 0; i < this.widgets.length; i++) {
      int val = this.widgets[i];
      list.add(
          Text("aaa", style: TextStyle(fontSize: (20 + val * 2).toDouble())));
    }
    return Column(
      children: list,
    );
  }

  void addText(int val) {
    setState(() {
      this.widgets.add(val);
    });
  }

  Widget toolBar() {
    return Row(
      children: <Widget>[
        ButtonBar(
          children: <Widget>[
            FlatButton(
              child: Text("H1"),
              onPressed: () {
                addText(1);
              },
            ),
            FlatButton(
              child: Text("H2"),
              onPressed: () {
                addText(2);
              },
            ),
            FlatButton(
              child: Text("H3"),
              onPressed: () {
                addText(3);
              },
            ),
            FlatButton(
              child: Text("H4"),
              onPressed: () {
                addText(4);
              },
            ),
            FlatButton(
              child: Text("H5"),
              onPressed: () {
                addText(5);
              },
            ),
            FlatButton(
              child: Text("H6"),
              onPressed: () {
                addText(6);
              },
            )
          ],
        )
      ],
    );
  }
}
