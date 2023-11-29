//import 'package:sqflite/sqflite.dart';

class DataStore {
  // final String fullPath;
  // //final OnDatabaseCreateFn? onCreate;
  // final int? version;

  // DataStore(this.fullPath, {this.onCreate, this.version}) {}
  //
  // Future<Database> _getDatabase() async {
  //   var db = openDatabase(
  //     fullPath,
  //     onCreate: onCreate,
  //     version: version,
  //   );
  //   return db;
  // }

  // Future<Map<String, dynamic>?> getByPk(String table, String pk) async {
  //   final db = await _getDatabase();
  //
  //   final List<Map<String, dynamic>> maps =
  //       await db.query(table, where: "pk=?", whereArgs: [pk]);
  //   if (maps.isNotEmpty) {
  //     return maps.first;
  //   }
  //   return null;
  // }

  // Future<List<Map<String, dynamic>>> query(String table,
  //     {bool? distinct,
  //     List<String>? columns,
  //     String? where,
  //     List<Object?>? whereArgs,
  //     String? groupBy,
  //     String? having,
  //     String? orderBy,
  //     int? limit,
  //     int? offset}) async {
  //   final db = await _getDatabase();
  //
  //   final List<Map<String, dynamic>> maps = await db.query(table,
  //       columns: columns,
  //       where: where,
  //       whereArgs: whereArgs,
  //       groupBy: groupBy,
  //       having: having,
  //       orderBy: orderBy,
  //       limit: limit,
  //       offset: offset);
  //
  //   return maps;
  // }

  // Future<void> insert(String table, Map<String, Object?> values) async {
  //   final db = await _getDatabase();
  //
  //   await db.insert(
  //     table,
  //     values,
  //     conflictAlgorithm: ConflictAlgorithm.replace,
  //   );
  // }
}
