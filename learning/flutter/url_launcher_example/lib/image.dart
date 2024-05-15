import 'package:flutter/material.dart';

class ImageApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: "Navigation Basics",
        home: Scaffold(
          backgroundColor: Colors.blue,
          body: Center(
            child: Image.asset("images/girl.jpeg"),
          ),
        ));
  }
}
