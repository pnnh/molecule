import 'package:polaris/application/route.dart';
import 'package:flutter/material.dart';

class MobileApplication extends StatefulWidget {
  const MobileApplication({super.key});

  @override
  State<MobileApplication> createState() => _MobileApplicationState();
}

class _MobileApplicationState extends State<MobileApplication> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Mobile App',
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
      color: Colors.white,
    );
  }
}


Future<Widget> initApp() async {
    return const MobileApplication();
}
