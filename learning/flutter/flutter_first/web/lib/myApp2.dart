import 'package:flutter/material.dart';

// 演示了Dialog功能
class MyApp2 extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My App 2',
      home: MyApp2Home(),
    );
  }
}

class MyApp2Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('aaaa'),
        actions: <Widget>[
          new IconButton(
            icon: const Icon(Icons.list),
            onPressed: () async {
              bool delete = await _showDeleteConfirmDialog1(context);
              if (delete == null) {
                print("取消删除");
              } else {
                print("已确认删除");
              }
            },
          ),
        ],
      ),
    );
  }

  Future<bool> _showDeleteConfirmDialog1(BuildContext context) {
    return showDialog<bool>(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text('提示'),
            content: Text("您确定要删除文件吗？"),
            actions: <Widget>[
              FlatButton(
                child: Text("取消"),
                onPressed: () => Navigator.of(context).pop(),
              ),
              FlatButton(
                child: Text("删除"),
                onPressed: () {
                  Navigator.of(context).pop(true);
                },
              )
            ],
          );
        });
  }
}
