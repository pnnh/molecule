
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'pages/article/read.dart';
import 'pages/home/home.dart';

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
            return ArticleReadPage(state.queryParams);
          },
        ),
      ],
    ),
  ],
);
