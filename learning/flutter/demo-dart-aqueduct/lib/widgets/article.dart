library quickstart;

import 'package:universal_html/html.dart';
import 'package:quickstart/context.dart';


class ArticleWidget {
  String id;

  ArticleWidget(String content) {
    id = content;
  }

  HtmlElement Render(Context context) {
    //if (!context.isClient) {
    var element = Element.tag('some-article');

    //var shadow = element.attachShadow({'mode': 'open'});

    element.append(Element.tag("p")
        ..appendText(this.getArticle(context)));
    //}
    return element;
  }

  static void Bind(HtmlElement element) {
    var h1 = element.querySelector('p');
    h1.onClick.listen((event) {
      window.console.log('哈哈哈');
    });
  }

  static void Style() {

  }

  String getArticle(Context context) {
    if (id.isEmpty) {
      id = '0';
    }
    return '这是一篇文章：' + id;
  }
}
