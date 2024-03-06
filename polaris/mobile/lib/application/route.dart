
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'pages/article/read.dart';
import 'pages/home/home.dart';
import 'pages/pictures/pictures.dart';
import 'pages/share/receive.dart';
import 'pages/share/share.dart';

final GoRouter globalRouter = GoRouter(
  routes: <RouteBase>[
    GoRoute(
      path: '/',
      builder: (BuildContext context, GoRouterState state) {
        return const HomePage();
      },
      routes: <RouteBase>[
        GoRoute(
          name: 'articleRead',
          path: 'article/read',
          builder: (BuildContext context, GoRouterState state) {
            return ArticleReadPage(state.pathParameters);
          },
        ),

        GoRoute(
          name: 'pictures',
          path: 'pictures/:pk',
          builder: (BuildContext context, GoRouterState state) {
            return PicturesPage(folderPk: state.pathParameters['pk'] as String);
          },
        ),
        GoRoute(
          name: 'share',
          path: 'share',
          builder: (BuildContext context, GoRouterState state) {
            return const ShareSendPage();
          },
        ),
        GoRoute(
          name: 'receive',
          path: 'receive',
          builder: (BuildContext context, GoRouterState state) {
            return const ShareReceivePage();
          },
        ),
      ],
    ),
  ],
);
