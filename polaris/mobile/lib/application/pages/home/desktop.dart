import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:polaris/application/pages/home/desktop/appbar.dart';
import 'package:polaris/application/pages/home/desktop/appbody.dart';

class HomeDesktopPage extends ConsumerWidget {
  const HomeDesktopPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {

    return const Scaffold(
      appBar: VSAppBar(),
      body: SafeArea(
        child: VSAppBodyWidget(),
      ),
    );
  }
}