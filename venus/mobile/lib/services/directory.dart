import 'dart:io';

import 'package:path/path.dart';
import 'package:venus/models/album.dart';
import 'package:venus/models/directory.dart';

Future<List<VSDirectoryModel>> selectDirectories(
    VSAlbumModel albumModel) async {
  var list = <VSDirectoryModel>[];

  var dir = Directory(albumModel.path);
  var lists = dir.listSync();
  for (var item in lists) {
    if (item is Directory) {
      var filename = basename(item.path);
      list.add(VSDirectoryModel(filename, path: item.path, title: filename));
    }
  }

  return list;
}

Future<List<VSDirectoryModel>> selectSubDirectories(
    VSDirectoryModel directoryModel) async {
  var list = <VSDirectoryModel>[];

  var dir = Directory(directoryModel.path);
  var lists = dir.listSync();
  for (var item in lists) {
    if (item is Directory) {
      var filename = basename(item.path);
      list.add(VSDirectoryModel(filename, path: item.path, title: filename));
    }
  }

  return list;
}