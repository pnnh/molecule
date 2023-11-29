import 'package:flutter/foundation.dart' show debugPrint, kDebugMode;

class AppConfig {
  static String get selfHost {
    if (kDebugMode) {
      return "127.0.0.1:3500";
    }
    return "client.polaris.direct";
  }

  static String get selfUrl {
    if (kDebugMode) {
      return "http://$selfHost";
    }
    return "https://$selfHost";
  }

  static String get serverHost {
    if (kDebugMode) {
      return "debug.polaris.direct";
    }
    return "client.polaris.direct";
  }

  static String get serverUrl {
    if (kDebugMode) {
      return "https://$serverHost";
    }
    return "https://$serverHost";
  }

  static String get authHost {
    return serverHost;
  }

  static String get authUrl {
    if (kDebugMode) {
      return "https://$authHost";
    }
    return "https://$authHost";
  }

  static String get fileUrl {
    if (kDebugMode) {
      return "https://$serverHost";
    }
    return "https://$serverHost";
  }
}

class AppHelper {
  static String filesUrl(String path) {
    debugPrint("buildFilesUrl: $path");
    if (path.isEmpty) {
      path = "/files/default/cover.jpg";
    }
    return "${AppConfig.fileUrl}$path";
  }
}
