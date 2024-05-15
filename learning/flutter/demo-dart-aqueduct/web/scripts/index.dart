
import 'package:universal_html/html.dart';

import 'package:quickstart/context.dart';
import 'package:quickstart/widgets/article_list.dart';

void main() {
  var artEl = document.querySelector('some-app');
  var context = Context(true);
  context.isClient = true;
  var artList = ArticleListWidget();
  if (!artEl.hasAttribute('ssr')) {
    artEl.append(artList.Render(context));
  }
    ArticleListWidget.Bind(artEl);
  //document.body.append(artEl);
  print('jjj');

}
