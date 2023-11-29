import 'dart:io' show Platform;
import 'package:venus/application/pages/home/home.dart';
import 'package:venus/application/pages/pictures/pictures.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

final GoRouter globalRouter = GoRouter(
  routes: <RouteBase>[
    GoRoute(
      path: '/',
      builder: (BuildContext context, GoRouterState state) {
        return const HomePage();
      },
      routes: <RouteBase>[
        GoRoute(
          path: 'pictures/:pk',
          builder: (BuildContext context, GoRouterState state) {
            return PicturesPage(folderPk: state.params['pk'] as String);
          },
        ),
      ],
    ),
  ],
);
