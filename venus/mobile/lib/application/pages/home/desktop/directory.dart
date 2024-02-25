import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:venus/application/components/arrow.dart';
import 'package:venus/application/components/loading.dart';
import 'package:venus/models/album.dart';
import 'package:venus/models/directory.dart';
import 'package:venus/services/directory.dart';

import 'album.dart';

final StateProvider<String> _activeItem = StateProvider((_) => "");
final StateProvider<VSDirectoryModel?> directoryModelProvider =
    StateProvider((_) => null);

class VSDirectoryWidget extends ConsumerStatefulWidget {
  final VSAlbumModel currentAlbum;

  const VSDirectoryWidget(this.currentAlbum, {super.key});

  @override
  ConsumerState<VSDirectoryWidget> createState() => _VSDirectoryWidgetState();
}

class _VSDirectoryWidgetState extends ConsumerState<VSDirectoryWidget> {
  final ScrollController _hCtrl = ScrollController();
  final ScrollController _vCtrl = ScrollController();

  _VSDirectoryWidgetState();

  /// 计算文字宽度
  double calculateText(String text, TextStyle style) {
    final TextPainter textPainter = TextPainter(
        textAlign: TextAlign.left,
        textDirection: TextDirection.ltr,
        text: TextSpan(text: text, style: style));
    textPainter.layout();
    return textPainter.width;
  }

  @override
  void dispose() {
    _hCtrl.dispose();
    _vCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
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
              Text(widget.currentAlbum.title),
              GestureDetector(
                child: const Image(
                    image: AssetImage('static/images/console/down-arrow.png')),
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
          child: FutureBuilder(
            future: selectDirectories(widget.currentAlbum),
            builder: (BuildContext context,
                AsyncSnapshot<List<VSDirectoryModel>> snapshot) {
              var directoryModels = snapshot.data;
              if (directoryModels == null) {
                return const VSLoading();
              }

              return Scrollbar(
                //-> ::tag1::
                thumbVisibility: true,
                notificationPredicate: (ScrollNotification notification) =>
                    notification.depth == 1,
                key: const Key('debuggerCodeViewVerticalScrollbarKey'),
                controller: _vCtrl,
                child: LayoutBuilder(
                  builder: (context, constraints) {
                    final double boxHeight = 2500;
                    double boxWidth = 500; //calculateText(text, style);
                    return Scrollbar(
                      key: const Key('debuggerCodeViewHorizontalScrollbarKey'),
                      thumbVisibility: true,
                      controller: _hCtrl,
                      child: SingleChildScrollView(
                          controller: _hCtrl,
                          scrollDirection: Axis.horizontal,
                          child: SizedBox(
                              height: constraints.maxHeight,
                              width: max(boxWidth, constraints.maxWidth),
                              child: SingleChildScrollView(
                                  controller: _vCtrl, //-> ::tag3::
                                  child: Container(
                                    color: Colors.blue,
                                    height: boxHeight,
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children:
                                          directoryModels.map((directory) {
                                        return _ItemWidget(directory);
                                      }).toList(),
                                    ),
                                  )))),
                    );
                  },
                ),
              );

              // return SingleChildScrollView(
              //     scrollDirection: Axis.horizontal,
              //     child: Column(
              //       crossAxisAlignment: CrossAxisAlignment.start,
              //       children: directoryModels.map((directory) {
              //         return _ItemWidget(directory);
              //       }).toList(),
              //     ));
            },
          ),
        ))
      ]),
    );
  }
}

class _ItemWidget extends ConsumerWidget {
  final VSDirectoryModel directoryModel;
  final int level;
  final StateProvider<bool> openSub = StateProvider<bool>((_) => false);

  _ItemWidget(this.directoryModel, {this.level = 0, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return FutureBuilder<List<VSDirectoryModel>>(
      future: selectSubDirectories(directoryModel),
      builder: (BuildContext context,
          AsyncSnapshot<List<VSDirectoryModel>> snapshot) {
        var subDirectoryModels = snapshot.data;
        var showSubModels = ref.watch(openSub) ? subDirectoryModels ?? [] : [];
        return Container(
            width: double.infinity,
            child: Column(
              children: [
                _ItemTitleWidget(
                  directoryModel,
                  openSub,
                  subDirectoryModels ?? [],
                  level: this.level,
                ),
                ...showSubModels
                    .map((e) => _ItemWidget(
                          e,
                          level: this.level + 1,
                        ))
                    .toList()
              ],
            ));
      },
    );
  }
}

class _ItemTitleWidget extends ConsumerWidget {
  final VSDirectoryModel directoryModel;
  final StateProvider<bool> openSub;
  final int level;
  final List<VSDirectoryModel> subDirectoryModels;

  const _ItemTitleWidget(
      this.directoryModel, this.openSub, this.subDirectoryModels,
      {this.level = 0, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MouseRegion(
      child: Container(
        color: ref.watch(_activeItem) == directoryModel.pk
            ? const Color(0xFFF2F2F2)
            : Colors.transparent,
        padding: EdgeInsets.only(left: 16, top: 8, bottom: 8, right: 16),
        child: Row(
          children: [
            SizedBox(
              width: this.level * 16,
            ),
            GestureDetector(
              child: this.subDirectoryModels.length > 0
                  ? VSArrowWidget(transform: ref.watch(openSub) ? 0 : -90)
                  : SizedBox(
                      height: 16,
                      width: 16,
                    ),
              onTap: () {
                ref.read(openSub.notifier).update((state) => !state);
              },
            ),
            GestureDetector(
              child: SizedBox(
                  width: 120,
                  child: Text(
                    directoryModel.title,
                    softWrap: false,
                    textAlign: TextAlign.left,
                    overflow: TextOverflow.ellipsis,
                    maxLines: 1,
                  )),
              onTap: () {
                ref
                    .read(directoryModelProvider.notifier)
                    .update((state) => directoryModel);
              },
            )
          ],
        ),
      ),
      onEnter: (event) {
        ref.read(_activeItem.notifier).update((state) => directoryModel.pk);
      },
      onExit: (event) {
        ref.read(_activeItem.notifier).update((state) => "");
      },
    );
  }
}
