// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'home.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

HomeResult _$HomeResultFromJson(Map<String, dynamic> json) => HomeResult(
      list: (json['list'] as List<dynamic>?)
              ?.map((e) => ResourceModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
      count: json['count'] as int? ?? 0,
    );

Map<String, dynamic> _$HomeResultToJson(HomeResult instance) =>
    <String, dynamic>{
      'list': instance.list,
      'count': instance.count,
    };
