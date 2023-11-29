import 'package:polaris/services/models/task.dart';
import 'package:hive/hive.dart';

class TaskAdapter extends TypeAdapter<Article> {
  @override
  final typeId = 0;

  @override
  Article read(BinaryReader reader) {
    return Article(reader.readString(), reader.readString(), reader.readString(),
        DateTime.fromMicrosecondsSinceEpoch(reader.readInt()));
  }

  @override
  void write(BinaryWriter writer, Article obj) {
    writer.writeString(obj.key);
    writer.writeString(obj.title);
    writer.writeString(obj.body);
    writer.writeInt(obj.time.millisecondsSinceEpoch);
  }
}
