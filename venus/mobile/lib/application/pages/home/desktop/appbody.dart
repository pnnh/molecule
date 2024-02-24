
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:venus/models/album.dart';
import './directory.dart';

import 'album.dart';
import 'navbar.dart';

final StateProvider<bool> activeSelectAlbum = StateProvider((_) => false);
final StateProvider<VSAlbumModel?> currentAlbumProvider = StateProvider((_) => null);

class VSAppBodyWidget extends ConsumerWidget {
  const VSAppBodyWidget({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      color: const Color(0xFFFFFFFF),
      child: Row(
        children: [
          const VSNavbar(),
          ref.watch(activeSelectAlbum) ? const VSAlbumWidget() : const VSDirectoryWidget()
        ],
      ),
    );
  }
}