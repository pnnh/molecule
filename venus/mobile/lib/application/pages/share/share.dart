
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ShareSendPage extends StatelessWidget {
  const ShareSendPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const _ShareSendPageState();
  }
}

class _ShareSendPageState extends ConsumerWidget {
  const _ShareSendPageState({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Text("文件分享页面"),
        ),
      ),
    );
  }
}