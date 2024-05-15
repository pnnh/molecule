import 'package:flutter/material.dart';

import 'launcher.dart';

class NApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Startup Name Generator',
      debugShowCheckedModeBanner: false,
      home: Scaffold(
          appBar: AppBar(
            title: Row(
              children: <Widget>[
                FlatButton.icon(
                    onPressed: () {},
                    icon: Icon(Icons.home,
                        color: Colors.white),
                    label: Text('主页',
                      style: TextStyle(color: Colors.white),)),
                FlatButton.icon(
                    onPressed: () {},
                    icon: Icon(Icons.timeline,
                        color: Colors.white),
                    label: Text('链路',
                      style: TextStyle(color: Colors.white),)),
                FlatButton.icon(
                    onPressed: () {},
                    icon: Icon(
                      Icons.color_lens,
                      color: Colors.white,
                    ),
                    label: Text(
                      '主题',
                      style: TextStyle(color: Colors.white),
                    ))
              ],
            ),
          ),
          body: Container(
            padding: EdgeInsets.all(16),
            child:
            Row(children: <Widget>[Expanded(child:
              FutureBuilder<List<Span>>(
                future: fetchActions(),
                builder: (BuildContext context, AsyncSnapshot<List<Span>> snapshot){

                  if (snapshot.hasData) {
                    var rows = snapshot.data.map((m) {
                      return DataRow(cells: <DataCell>[
                        DataCell(Text(m.time)),
                        DataCell(Text(m.status)),
                        DataCell(Text(m.action)),
                        DataCell(Text(m.user)),
                        DataCell(Text(m.duration.toString())),
                        DataCell(IconButton(icon: Icon(Icons.timeline), onPressed: () {},)),
                      ],);
                    }).toList();
                    return Scrollbar(
                      child: SingleChildScrollView(
                        scrollDirection: Axis.vertical,
                        child: DataTable(
                          columns: <DataColumn>[
                            DataColumn(label: Text('时间')),
                            DataColumn(label: Text('状态')),
                            DataColumn(label: Text('接口')),
                            DataColumn(label: Text('用户')),
                            DataColumn(label: Text('延时')),
                            DataColumn(label: Text('操作')),
                          ],
                          rows: rows,
                        ),
                      ) ,
                    );
                  } else {
                    return Text('等待数据...');
                  }
              },
              )
              ,)],) ),
          )
    );
  }

   Widget buildCard() {
      return Center(
        child: Card(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              const ListTile(
                leading: Icon(Icons.album),
                title: Text('The Enchanted Nightingale'),
                subtitle: Text('Music by Julie Gable. Lyrics by Sidney Stein.'),
              ),
              ButtonBar(
                children: <Widget>[
                  FlatButton(
                    child: const Text('BUY TICKETS'),
                    onPressed: () { /* ... */ },
                  ),
                  FlatButton(
                    child: const Text('LISTEN'),
                    onPressed: () { /* ... */ },
                  ),
                ],
              ),
            ],
          ),
        ),
      );
    }


  Future<List<Span>> fetchActions() async {
    //launch('https://www.google.com');
    //get('http://localhost:4040');

    final jOut = await fetchJson("http://localhost:4040/action");
    print('=====');
    //print(jOut["hits"] as List);
    final hits = jOut["hits"] as List;
    var c = hits.map((m) {
      final span = Span();
      span.status = m["status"] as String;
      span.user = m["user"]  as String;
      span.time = m["time"]  as String;
      span.action = m["action"]  as String;
      span.user = m["user"]  as String;
      span.duration = m["duration"]  as int;
      return span;
    }).toList();
    return c;
  }
}

class Span {
  String time;
  String status;
  String user;
  String action;
  int duration;

}