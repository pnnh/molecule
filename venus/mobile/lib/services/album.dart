import 'package:venus/models/album.dart';

Future<List<VSAlbumModel>> selectAlbums() async {
  var list = <VSAlbumModel>[];

  list.add(VSAlbumModel("a", path: "/a", title: "测试图集a"));
  list.add(VSAlbumModel("b", path: "/b", title: "测试图集b"));
  list.add(VSAlbumModel("c", path: "/c", title: "测试图集c"));
  list.add(VSAlbumModel("d", path: "/d", title: "测试图集d"));
  list.add(VSAlbumModel("e", path: "/e", title: "测试图集e"));

  return list;
}