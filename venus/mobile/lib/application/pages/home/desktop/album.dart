import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:venus/application/components/empty.dart';
import 'package:venus/application/pages/home/desktop/directory.dart';
import 'package:venus/services/album.dart';
import 'package:venus/models/album.dart';

import 'appbody.dart';

final StateProvider<String> _activeItem = StateProvider((_) => "");
final StateProvider<String> activeSelectAlbum = StateProvider((_) => "");

class VSAlbumWidget extends ConsumerWidget {
  final List<VSAlbumModel> albums;
  const VSAlbumWidget(this.albums, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    if (albums.isEmpty) {
      return const VSEmptyWidget();
    }
    if (ref.watch(activeSelectAlbum).isEmpty) {
      return VSDirectoryWidget(albums.first);
    }
    var currentKey = ref.watch(activeSelectAlbum);
    if (currentKey != "XXX") {
      var newAlbum = albums.firstWhere(
          (element) => element.pk == ref.watch(activeSelectAlbum),
          orElse: () => albums.first);
      return VSDirectoryWidget(newAlbum);
    }
    return Container(
      color: const Color(0xFFF9F9F9),
      width: 200,
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Container(
          height: 40,
          color: const Color(0xFFF2F2F2),
          child: Row(
            children: [
              const SizedBox(
                width: 16,
              ),
              const Text("选择图集"),
              GestureDetector(
                child: Transform(
                  alignment: Alignment.center,
                  transform: Matrix4.rotationX(180),
                  child: const Image(
                      image:
                          AssetImage('static/images/console/down-arrow.png')),
                ),
                onTap: () {
                  ref.read(activeSelectAlbum.notifier).update((state) => "XXX");
                },
              )
            ],
          ),
        ),
        Expanded(
            child: Container(
                width: double.infinity,
                padding: EdgeInsets.zero,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: albums.map((album) => _ItemWidget(album)).toList(),
                )))
      ]),
    );
  }
}

class _ItemWidget extends ConsumerWidget {
  final VSAlbumModel albumModel;
  const _ItemWidget(this.albumModel);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MouseRegion(
      child: GestureDetector(
        child: Container(
          padding:
              const EdgeInsets.only(left: 16, right: 16, top: 8, bottom: 8),
          width: double.infinity,
          color: ref.watch(_activeItem) == albumModel.pk
              ? const Color(0xFFF2F2F2)
              : Colors.transparent,
          child: Text(albumModel.title),
        ),
        onTap: () {
          ref.read(activeSelectAlbum.notifier).update((state) => albumModel.pk);
        },
      ),
      onEnter: (event) {
        ref.read(_activeItem.notifier).update((state) => albumModel.pk);
      },
      onExit: (event) {
        ref.read(_activeItem.notifier).update((state) => "");
      },
    );
  }
}
