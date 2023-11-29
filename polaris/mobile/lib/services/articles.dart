import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;  

import '../config.dart';
import 'models/article.dart';

class ArticleService {

  final List<ArticleModel> _items = List.empty(growable: true);

  ArticleService() {

    for(var i = 0; i< 10; i++) {

      var model = ArticleModel(pk: "pk$i", title: "title$i", body: "body$i");
      _items.add(model);
    }
  }

  Future<List<ArticleModel>> selectArticles() async {
    return _items;
  }

  Future<void> addArticle(String title, String content) async {
    if (title == "" || content == "") return;

    var article = ArticleModel(title: title, body: content);

    _items.add(article);
  }

  Future<ArticleModel?> getArticle(String pk) async {
    for(var i = 0; i < _items.length; i++){
      var model = _items[i];
      if (model.pk == pk) {
        return model;
      }
    }
    return null;
  }
}


