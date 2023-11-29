import 'package:venus/services/models/folder.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final StateProvider<FolderModel> folderProvider = StateProvider((_) => FolderModel("", path: ""));

final StateProvider<String> gridProvider = StateProvider((_) => "");
