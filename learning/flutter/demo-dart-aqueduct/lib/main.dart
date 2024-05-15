import 'dart:convert';
import 'dart:io';

void main() async {
  var server = await HttpServer.bind('0.0.0.0', 8300);
  print('Serving at ${server.address}:${server.port}');

  await for (var request in server) {
    // request.response
    //   ..headers.contentType = ContentType('text', 'html', charset: 'utf-8')
    //   ..write(await readFile())
    //   ..close();
    handleRequest(request);
  }
}

void handleRequest(HttpRequest request) async {
  var path = request.uri.path;
  print("===>${path}");
  var response = request.response;

  // if (path == '/') {
  //   await writeFile(response, './public/index.html');
  // } else if (path == '/favicon.ico') {
  //   await writeFile(response, './public/favicon.ico');
  // } else if (path == '/styles.css') {
  //   await writeFile(response, './public/styles.css');
  // } else {
  //   //await writeFile(response, './build/web${path.trimRight()}');
  //   await writeFile(response, './public${path.trimRight()}');
  // }
  if (path == '/') {
    path = '/index.html';
  }
  if (path.startsWith('/build') && path.endsWith('.dart')) {
    //await writeFile(response, './client${path.substring(6).trimRight()}');
  } else {
    await writeFile(response, './public${path.trimRight()}');
  }
  await response.close();
}

void writeFile(HttpResponse response, String filePath) async {
  var myFile = File(filePath);

  if (!await myFile.exists()) {
    response.statusCode = 404;
    return;
  }
  if (filePath.endsWith('.html')) {
    response.headers.contentType = ContentType('text', 'html');
    response.write(await myFile.readAsString());
  } else if (filePath.endsWith('.css')) {
    response.headers.contentType = ContentType('text', 'css');
    response.write(await myFile.readAsString());
  } else if (filePath.endsWith('.js')) {
    response.headers.contentType = ContentType('application', 'javascript');
    response.write(await myFile.readAsString(encoding: utf8));
  } else if (filePath.endsWith('.map')) {
    response.headers.contentType = ContentType('text', 'plain');
    response.write(await myFile.readAsString(encoding: utf8));
  } else if (filePath.endsWith('.dart')) {
    response.headers.contentType = ContentType('application', 'dart');
    //var content = await myFile.readAsString();
    await response.addStream(myFile.openRead());
  } else {
    response.write(await myFile.readAsBytes());
  }
}
