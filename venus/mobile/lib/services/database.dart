import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:path/path.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sqlite3/sqlite3.dart';

import 'files/files.dart';


class DBHelper {
  Database? _database;

  static final DBHelper instance = DBHelper._internal();

  factory DBHelper() {
    return instance;
  }

  DBHelper._internal();

  Future<Database> _openDatabase() async {
    if (_database != null) {
      return _database!;
    }
    Directory appDocDir = await getApplicationDocumentsDirectory();

    String appDocPath = appDocDir.path;
    var homeDir = appDocPath;
    var dataDir = join(homeDir, "databases");
    await touchDirectory(dataDir);
    const databaseName = 'venus.db3';
    var fullPath = join(dataDir, databaseName);
    debugPrint("fullPath: $fullPath");

    //var initSql = await rootBundle.loadString('static/sql/init.sql');

    final db = sqlite3.open(fullPath);

    //db.loadSimpleExtension();

    // if (initSql.isNotEmpty) {
    //   var list = initSql.split(";");
    //   for (var sqlText in list) {
    //     if (sqlText.trim().isEmpty) {
    //       continue;
    //     }
    //     db.execute(sqlText);
    //   }
    // }

    _database = db;
    return _database!;
  }

  Future<void> executeAsync(String sql, [List<Object?> parameters = const []]) async {
    var database = await _openDatabase();
    database.execute(sql, parameters);
  }

  Future<ResultSet> selectAsync(String sql, [List<Object?> parameters = const []]) async {
    var database = await _openDatabase();
    return database.select(sql, parameters);
  }

  Future<void> transactionAsync(bool Function(Database) action) async {
    Database? database;
    var sqlTextRollback = "rollback;";
    try {
      database = await _openDatabase();
      var sqlTextBegin = "begin;";

      var sqlTextCommit = "commit;";

      database.execute(sqlTextBegin);

      var ok = action(database);
      if (ok) {
        database.execute(sqlTextCommit);
      } else {
        database.execute(sqlTextRollback);
      }
    } catch (e) {
      debugPrint("transactionAsync error: $e");
      database?.execute(sqlTextRollback);
    }
  }
}
