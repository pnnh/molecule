library quickstart;

import 'package:quickstart/widgets/article.dart';
import 'package:universal_html/html.dart';
import 'package:quickstart/context.dart';

class ArticleListWidget {
  HtmlElement Render(Context context) {
  var element = Element.tag('some-article-list');


      for(var data in getArticleList(context)) {
        var art = ArticleWidget(data).Render(context);
        element.append(art);
      }
    return element;
  }

  static void Bind(HtmlElement element) {
    var h1 = element.querySelectorAll('some-article');
    for(var el in h1) {
      ArticleWidget.Bind(el);
    }
  }

  List<String> getArticleList(Context context) {
    var list = <String>[];
    if (context.isClient) {
      list.add('我是一篇开发中的文章');
      list.add('我是一篇开发中的文章2');
      list.add('我是一篇开发中的文章3');
      list.add('我是一篇开发中的文章4');
      return list;
    }
    list.add('正式的一篇文章');
    list.add('正式的一篇文章2');
    list.add('正式的一篇文章3');
    list.add('正式的一篇文章4');
    return list;
  }

}
