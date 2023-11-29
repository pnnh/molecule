import 'dart:io' show Platform;

import 'package:file_picker/file_picker.dart';
import 'package:flutter/cupertino.dart';

import '../utils/utils.dart';
import 'database.dart';
import 'models/folder.dart';


class Folders {
  static Future<FolderModel?> pickFolder() async {
    String? selectedDirectory = await FilePicker.platform.getDirectoryPath();

    if (selectedDirectory != null) {
      debugPrint("selectedDirectory: $selectedDirectory");

      String bookmark = "";
      var pk = generateRandomString(16);
      var newFolder = FolderModel(pk,
          path: selectedDirectory);
      await insertFolder(newFolder);

      return newFolder;
    }

    return null;
  }
}

Future<FolderModel?> getFolder(String pk) async {
  var sqlText = "select * from folders where pk = ?";

  var list = await DBHelper().selectAsync(sqlText, [pk]);

  debugPrint("list ${list.length}");

  if (list.isNotEmpty) {
    return FolderModel.fromJson(list[0]);
  }

  return null;
}

Future<void> updateFilesCount(String pk, int count) async {
  var sqlText = '''update folders set count = ? where pk = ?;''';

  await DBHelper().executeAsync(sqlText, [count, pk]);
}

Future<void> insertFolder(FolderModel model) async {
  await DBHelper.instance.transactionAsync((database)
  {
      var sqlTextInsertFolder = '''
insert into folders(pk, path, count)
values(?, ?, 0);
''';
      var pk = generateRandomString(8);

      database.execute(sqlTextInsertFolder, [pk, model.path]);
      return true;
  });
}

Future<List<FolderModel>> queryFolders(String a) async {
  var sqlText = '''select * from folders;''';

  var list = await DBHelper().selectAsync(sqlText);

  debugPrint("list ${list.length}");

  var foldersList = List.generate(list.length, (i) {
    return FolderModel.fromJson(list[i]);
  });

  return foldersList;
}
