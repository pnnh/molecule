import 'package:venus/services/models/folder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_sharing_intent/flutter_sharing_intent.dart';
import 'package:flutter_sharing_intent/model/sharing_file.dart';

final StateProvider<FolderModel> folderProvider = StateProvider((_) => FolderModel("", path: ""));

final StateProvider<String> gridProvider = StateProvider((_) => "");

final StateProvider<List<SharedFile>> shareReceiveProvider = StateProvider((_) => []);
