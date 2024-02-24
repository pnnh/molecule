import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:path/path.dart';
import 'package:venus/models/album.dart';

Future<List<VSAlbumModel>> selectAlbums() async {
  var list = <VSAlbumModel>[];

  // list.add(VSAlbumModel("a",
  //     path: "/Users/Larry/Pictures/Venus/一号图集.vsalbum", title: "一号图集"));
  // list.add(VSAlbumModel("b",
  //     path: "/Users/Larry/Pictures/Venus/二号图集.vsalbum", title: "二号图集"));
  // list.add(VSAlbumModel("c",
  //     path: "/Users/Larry/Pictures/Venus/哔哔叭叭让人.vsalbum", title: "哔哔叭叭让人"));

  var currentPath = Directory.current.path;
  debugPrint("currentPath: $currentPath");

  var dir = Directory("Documents/Venus");
  var lists = dir.listSync();
  for (var item in lists) {
    var albumExt = ".vsalbum";
    if (item is Directory && item.path.endsWith(albumExt)) {
      var filename = basename(item.path);
      var title = filename.substring(0, filename.length - albumExt.length);
      list.add(VSAlbumModel(filename, path: item.path, title: title));
    }
  }

  return list;
}
