import 'package:venus/models/directory.dart';

Future<List<VSDirectoryModel>> selectDirectories(String albumPk) async {
  var list = <VSDirectoryModel>[];

  if (albumPk == "a") {
    list.add(VSDirectoryModel("a", path: "/a", title: "字母目录A"));
    list.add(VSDirectoryModel("b", path: "/b", title: "字母目录B", parent: "a"));
    list.add(VSDirectoryModel("c", path: "/c", title: "字母目录C"));
    list.add(VSDirectoryModel("d", path: "/d", title: "字母目录D", parent: "c"));
    list.add(VSDirectoryModel("e", path: "/e", title: "字母目录E", parent: "c"));
    list.add(VSDirectoryModel("f", path: "/f", title: "字母目录F", parent: "e"));
    list.add(VSDirectoryModel("g", path: "/g", title: "字母目录G", parent: "e"));
    list.add(VSDirectoryModel("h", path: "/h", title: "字母目录H", parent: ""));
  } else {

    list.add(VSDirectoryModel("a1", path: "/a", title: "数字分区目录A"));
    list.add(VSDirectoryModel("b1", path: "/b", title: "数字分区目录B", parent: "a"));
    list.add(VSDirectoryModel("c1", path: "/c", title: "数字分区目录C"));
    list.add(VSDirectoryModel("d1", path: "/d", title: "数字分区目录D", parent: "c"));
    list.add(VSDirectoryModel("e1", path: "/e", title: "数字分区目录E", parent: "c"));
    list.add(VSDirectoryModel("f1", path: "/f", title: "数字分区目录F", parent: "e"));
    list.add(VSDirectoryModel("g1", path: "/g", title: "数字分区目录G", parent: "e"));
    list.add(VSDirectoryModel("h1", path: "/h", title: "数字分区目录H", parent: ""));
  }


  return list;

}