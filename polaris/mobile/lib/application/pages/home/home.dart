
import 'package:flutter/material.dart';
import './list.dart';


class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("北极星"),
      ),
      body: const SafeArea(
        child: _HomeBody(),
      ),
    );
  }
}

class _HomeBody extends StatelessWidget {
  const _HomeBody({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const _DesktopHomeBodyWidgetState();
  }
}

class _DesktopHomeBodyWidgetState extends StatelessWidget {
  const _DesktopHomeBodyWidgetState({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        color: Colors.white,
        child: Column(
          children: [
            Expanded(
                child: GestureDetector(
                    onTapDown: (detail) {
                      debugPrint("out click");
                    },
                    child: const Row(children: [
                      TodoListWidget()
                    ])))
          ],
        ));
  }
}
