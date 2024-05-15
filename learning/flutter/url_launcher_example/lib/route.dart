import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

//
//void main() => runApp(MaterialApp(
//    title: "Navigation Basics",
//    home: FirstRoute(),
//));

class FirstRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('First Route')),
        body: Center(
          child: RaisedButton(
            child: Text('Open route'),
            onPressed: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => SecondRoute()));
            },
          ),
        ));
  }
}

class SecondRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build

    return Scaffold(
      appBar: AppBar(title: Text("Second Route")),
      body: Center(
        child: RaisedButton(
          child: Text("Go Back!"),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
    );
  }
}
