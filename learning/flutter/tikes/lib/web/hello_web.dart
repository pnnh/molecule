import 'dart:async';
import 'dart:convert';
import 'dart:html';

class Hello {
  static String get platformVersion {
    return "dfdfsd";
  }

  static Future<dynamic> fetchJson(String urlString) async {
    var url = urlString;
    print('aaa' + url);

    var b = await HttpRequest.getString(url);
    //print(b);
    final c = json.decode(b);
    //print(c);
    //print(c["a"]);
    return c;
  }
}
