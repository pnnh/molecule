import 'package:venus/services/models/picture.dart';
import 'package:json_annotation/json_annotation.dart';

part 'home.g.dart';

@JsonSerializable()
class HomeResult {
  List<PictureModel> list;
  int count;

  HomeResult({this.list = const [], this.count = 0});

  factory HomeResult.fromJson(Map<String, dynamic> json) =>
      _$HomeResultFromJson(json);

  Map<String, dynamic> toJson() => _$HomeResultToJson(this);
}
