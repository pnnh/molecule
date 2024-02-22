
import 'package:flutter/material.dart';
import './list.dart';
import 'partials/appbar.dart';
import 'partials/appbody.dart';


class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: AppbarWidget(),
      body: SafeArea(
        child: AppBodyWidget(),
      ),
    );
  }
}

