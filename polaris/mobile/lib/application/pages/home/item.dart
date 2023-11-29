import 'package:go_router/go_router.dart';
import 'package:polaris/services/models/article.dart';
import 'package:flutter/material.dart';

class TodoItemWidget extends StatefulWidget {
  final ArticleModel article;

  const TodoItemWidget({Key? key, required this.article })
      : super(key: key);

  @override
  State<TodoItemWidget> createState() => _TodoItemWidget();
}

class _TodoItemWidget extends State<TodoItemWidget> {
  final Color hoveredColor = const Color.fromRGBO(248, 249, 255, 100);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        context.goNamed('articleRead', queryParams: {'pk': widget.article.pk});
      },
      child: Text(
          widget.article.title
      ),
    );
  }
}
