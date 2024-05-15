import 'dart:convert';
import 'package:quickstart/widgets/article_list.dart';
import 'package:universal_html/parsing.dart';
import 'dart:io' as io;
import 'package:quickstart/widgets/article.dart';
import 'package:quickstart/context.dart';

void main() async {
  var server = await io.HttpServer.bind(io.InternetAddress.loopbackIPv4, 8081);
  print('Serving at ${server.address}:${server.port}');

  await for (var request in server) {
    handleRequest(request);
  }
}

void handleRequest(io.HttpRequest request) async {
  var path = request.uri.path;
  print("===>${path}");
  var response = request.response;

  if (path == '/') {
    //await writeFile(response, './build/web/index.html');
    handleIndex(request.response);
    return;
  } else {
    await writeFile(response, './build/web/${path.trimRight()}');
  }
  await response.close();
}

void handleIndex(io.HttpResponse response) async {
  var myFile = io.File('./build/web/index.html');
  var fileStr = myFile.readAsString(encoding: utf8);

  final xmlDocument = parseHtmlDocument(await fileStr);

  var artEl = xmlDocument.querySelector('some-app');
  var context = Context(true);
  context.isClient = false;
  var artList = ArticleListWidget();
  artEl.append(artList.Render(context));
  artEl.setAttribute('ssr', '');

  //art.Render(artEl, context);

  //print(xmlDocument.documentElement.outerHtml);

  response.headers.contentType = io.ContentType('text', 'html', charset: 'utf-8');

  var content = xmlDocument.documentElement.outerHtml;
  await response.write(content);
  // await response.add(xmlDocument.documentElement.outerHtml.codeUnits);
  await response.close();
}

void writeFile(io.HttpResponse response, String filePath) async {
  var myFile = io.File(filePath);

  if (!await myFile.exists()) {
    response.statusCode = 404;
    return;
  }
  if (filePath.endsWith('.html')) {
    response.headers.contentType = io.ContentType('text', 'html');
    await response.addStream(await myFile.openRead());
  } else if (filePath.endsWith('.css')) {
    response.headers.contentType = io.ContentType('text', 'css');
    await response.addStream(await myFile.openRead());
  } else if (filePath.endsWith('.js')) {
    response.headers.contentType = io.ContentType('application', 'javascript');
    await response.addStream(await myFile.openRead());
  } else if (filePath.endsWith('.map')) {
    response.headers.contentType = io.ContentType('text', 'plain');
    await response.addStream(await myFile.openRead());
  } else if (filePath.endsWith('.dart')) {
    response.headers.contentType = io.ContentType('application', 'dart');
    //var content = await myFile.readAsString();
    await response.addStream(myFile.openRead());
  } else {
    response.write(await myFile.readAsBytes());
  }

}
