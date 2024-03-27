import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:polaris/models/home.dart';
import 'package:polaris/services/home.dart';

import 'appbar.dart';

class WHomePage extends ConsumerWidget {
  const WHomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {

    return const Scaffold(
      appBar: WAppBarPartial(),
      body: SafeArea(
        child: WAppBodyPartial(),
      ),
    );
  }
}

class WAppBodyPartial extends ConsumerWidget {
  const WAppBodyPartial({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      color: const Color(0xFFFFFFFF),
      child: FutureBuilder(
        future: queryHome(),
        builder: (BuildContext context, AsyncSnapshot<HomeResult> snapshot) {
          if (snapshot.hasError) {
            return Text("加载出错 ${snapshot.error}");
          }

          if (!snapshot.hasData || snapshot.data == null || snapshot.data?.range == null) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
          var articles = snapshot.data!.range;
          return ListView.builder(
            itemCount: articles.length,
            itemBuilder: (BuildContext context, int index) {
              var article = articles[index];
              return ListTile(
                title: Text(article.title),
                subtitle: Text(article.body??""),
              );
            },
          );
        },
    ));
  }
}
