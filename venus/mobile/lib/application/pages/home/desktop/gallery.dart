import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:venus/application/components/empty.dart';
import 'package:venus/application/components/loading.dart';
import 'package:venus/models/picture.dart';
import 'package:venus/services/picture.dart';

import 'directory.dart';

class VSGalleryWidget extends ConsumerWidget {
  const VSGalleryWidget({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    var directoryModel = ref.watch(directoryModelProvider);
    if (directoryModel == null) {
      return const VSEmptyWidget();
    }
    return FutureBuilder<List<PictureModel>>(
        future: selectPictures(directoryModel),
        builder: ((context, snapshot) {
          var albums = snapshot.data;
          if (albums == null || albums.isEmpty) {
            return const VSEmptyWidget();
          }
          return GridView.builder(
            shrinkWrap: true,
            itemCount: albums.length,
            physics: const NeverScrollableScrollPhysics(),
            padding: const EdgeInsets.symmetric(horizontal: 16),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 8,
              mainAxisSpacing: 8,
              crossAxisSpacing: 8,
              childAspectRatio: 1,
            ),
            itemBuilder: (context, index) {
              return _PictureTileWidget(albums[index]);
            },
          );
        }));
  }
}

class _PictureTileWidget extends ConsumerWidget {
  final PictureModel picture;
  const _PictureTileWidget(this.picture, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      color: const Color(0xFFF9F9F9),
      child: Image.file(File(picture.path)),
    );
  }
}
