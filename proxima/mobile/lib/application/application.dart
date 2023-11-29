import 'dart:io' show Platform;

import 'package:venus/application/route.dart';
import 'package:flutter/material.dart';


class MainApplication extends StatefulWidget {
  const MainApplication({Key? key}) : super(key: key);

  @override
  State<MainApplication> createState() => _MainApplicationState();
}

class _MainApplicationState extends State<MainApplication> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Venus Lighting',
      routerConfig: globalRouter,
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
          useMaterial3: true,
          scaffoldBackgroundColor: Colors.white,
          iconTheme: const IconThemeData(size: 24)),
      darkTheme: ThemeData(
          useMaterial3: true,
          scaffoldBackgroundColor: Colors.black,
          iconTheme: const IconThemeData(size: 24)),
      // routerDelegate: globalRouter.routerDelegate,
      // routeInformationParser: globalRouter.routeInformationParser,
      color: Colors.white,
    );
  }
}



Future<Widget> initApp() async {
    return const MainApplication();
}
