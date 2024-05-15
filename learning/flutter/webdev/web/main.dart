@JS()
library static_interop;

import 'dart:js_util';

import 'package:js/js.dart';
import 'dart:html' as html;

@JSExport()
class Counter {
  int value = 5;
  @JSExport('increment')
  void renamedIncrement() {
    value++;
  }
}

@JS()
@staticInterop
class JSCounter {}

extension on JSCounter {
  external int value;
  external void increment();
}

@JS('functionName')
external set _functionName(void Function() f);

void _someDartFunction() {
  print('Hello from Dart!');
}

void main() {
  var dartCounter = Counter();
  var counter = createDartExport<Counter>(dartCounter) as JSCounter;
  print(counter.value);
  counter.increment();
  print(counter.value);
  print(dartCounter.value); // Dart object gets modified
  dartCounter.value = 0;
  print(counter.value); // Ch

  _functionName = allowInterop(_someDartFunction); // 可以在js端调用functionName方法

  // var dartObject = new WebMainAbc();
  // createDartExport(dartObject);
}
