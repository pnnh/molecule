import 'dart:math';
import 'dart:io';
import 'package:polaris/config.dart';
import 'package:flutter/material.dart';
import 'package:crypto/crypto.dart';

String buildFileUrl(String fileUrl) {
  // if (kDebugMode) {
  //   return "http://127.0.0.1:3000/src/index.tsx";
  // }
  return AppConfig.serverUrl + fileUrl;
}

const int screenSmall = 320;
const int screenMedium = 640;
const int screenLarge = 1280;

const int screenPhone = screenSmall;
const int screenTablet = screenMedium;
const int screenDesktop = screenLarge;

class LayoutHelper {
  late final MediaQueryData mediaQueryData;

  LayoutHelper(BuildContext context) {
    mediaQueryData = MediaQuery.of(context);
  }

  bool get isScreenPhone {
    return mediaQueryData.size.width <= screenPhone;
  }

  bool get isScreenTablet {
    return mediaQueryData.size.width <= screenPhone;
  }

  bool get isScreenDesktop {
    return mediaQueryData.size.width <= screenPhone;
  }

  int get getGridColumns {
    if (isScreenPhone) return 4;
    if (isScreenTablet) return 8;
    return 16;
  }
}

String generateRandomString(int len) {
  var r = Random();
  return String.fromCharCodes(List.generate(len, (index) => r.nextInt(33) + 89));
}


// 将纳秒时间戳转换为友好格式
String formatDateTime(int nanoseconds) {
  var timeStr =
  DateTime.fromMicrosecondsSinceEpoch((nanoseconds / 1000).round())
      .toString();
  return timeStr.substring(0, 16);
}


Future<String> generateChecksum(String filePath) async {
  final fileStream = File(filePath).openRead();
  final checksum = (await md5.bind(fileStream).first).toString();
  return checksum;
}