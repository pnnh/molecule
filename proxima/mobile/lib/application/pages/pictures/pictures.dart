import 'dart:io';

import 'package:venus/services/folder.dart';
import 'package:venus/services/models/picture.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:path/path.dart' as path;
import 'package:venus/services/picture.dart';

final StateProvider<String> _gridProvider = StateProvider((_) => "");
final StateProvider<String> _searchProvider = StateProvider((_) => "");


class PicturesPage extends StatelessWidget {
  final String folderPk;
  const PicturesPage({Key? key, required this.folderPk}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("图片列表"),
      ),
      body: SafeArea(
        child: _PicturesBody(folderPk: folderPk),
      ),
    );
  }
}

class _PicturesBody extends ConsumerStatefulWidget {
  final String folderPk;
  const _PicturesBody({Key? key, required this.folderPk}) : super(key: key);

  @override
  ConsumerState<_PicturesBody> createState() => _MPicturesPageState();
}

class _MPicturesPageState extends ConsumerState<_PicturesBody> {
  @override
  Widget build(BuildContext context) {
    debugPrint("current directory: ${Directory.current}");
    return Container(
        color: Colors.white,
        child: Column(
          children: [
            Container(
              padding: EdgeInsets.all(16),
              child: TextField(
                onChanged: (newText) {
                  debugPrint("newText $newText");
                  ref
                      .watch(_searchProvider.notifier)
                      .update((state) => newText);
                },
                enableInteractiveSelection: true,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  hintText: "搜索图片",
                  contentPadding:
                  EdgeInsets.only(bottom: 4, top: 4, left: 8, right: 8),
                ),
              ),
            ),
            Expanded(
                child: _PicturesGrid(
                  folderPk: widget.folderPk,
                  searchText: ref.watch(_searchProvider),
                ))
          ],
        ));
  }
}

class _PicturesGrid extends ConsumerWidget {
  String folderPk = "";
  String searchText;

  _PicturesGrid({Key? key, required this.folderPk, this.searchText = ""})
      : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return SingleChildScrollView(
      child: Container(
        padding: EdgeInsets.all(16),
        height: 4000,
        child: FutureBuilder<List<PictureModel>>(
          future: _selectPics2(this.folderPk, this.searchText),
          builder: (BuildContext context, AsyncSnapshot snapshot) {
            //debugPrint("pics: ${snapshot.data}");
            if (!snapshot.hasData) {
              return Center(
                child: Text("Empty"),
              );
            }
            var picList = snapshot.data as List<PictureModel>;
            return GridView(
              padding: EdgeInsets.zero,
              gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
                maxCrossAxisExtent: 120.0,
                childAspectRatio: 1.0,
                mainAxisSpacing: 16,
                crossAxisSpacing: 16,
              ),
              physics: NeverScrollableScrollPhysics(),
              children: picList.map((e) => _PicturesImageCell(e)).toList(),
            );
          },
        ),
      ),
    );
  }

  Future<List<PictureModel>> _selectPics2(String folderPk, searchText) async {
    debugPrint("_searchPics $folderPk $searchText");
    var folderModel = await getFolder(folderPk);
    if (folderModel == null) {
      return List.empty();
    }

    var pics = await selectPicturesByFolder(folderModel);

    return pics;
  }
}

class _PicturesImageCell extends ConsumerWidget {
  final PictureModel model;
  late final TextEditingController _controller;
  final searchBorder = OutlineInputBorder(
    borderSide: const BorderSide(
        color: Color.fromRGBO(240, 240, 240, 100),
        width: 1,
        style: BorderStyle.solid),
    borderRadius: BorderRadius.circular(4),
  );

  _PicturesImageCell(this.model, {Key? key}) : super(key: key) {
    _controller = TextEditingController(text: path.basename(model.path));
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    var pk = ref.watch(_gridProvider);
    return Column(children: [
      Expanded(
        child: Container(
          child: Image(
            image: FileImage(File(model.path)),
            fit: BoxFit.fill,
          ),
        ),
      ),
      if (pk == model.pk)
        Container(
          height: 32,
          padding: const EdgeInsets.all(8),
          child: TextField(
            keyboardType: TextInputType.text,
            style: const TextStyle(fontSize: 14),
            autofocus: true,
            decoration: InputDecoration(
              hoverColor: Colors.white,
              hintText: '搜索图片',
              hintStyle: TextStyle(fontSize: 14),
              contentPadding: EdgeInsets.all(0),
              filled: true,
              fillColor: Colors.white,
              enabledBorder: searchBorder,
              focusedBorder: searchBorder,
              focusedErrorBorder: searchBorder,
              border: searchBorder,
            ),
            controller: _controller,
          ),
        )
      else
        GestureDetector(
          onTap: () {
            ref.read(_gridProvider.notifier).update((state) => model.pk);
            _controller.selection = TextSelection(
                baseOffset: 0, extentOffset: _controller.value.text.length);
          },
          child: Container(
            height: 32,
            padding: const EdgeInsets.all(8),
            child: Tooltip(
              message: _controller.text,
              child: Text(
                _controller.text,
                softWrap: false,
                style: const TextStyle(
                    color: Color.fromARGB(255, 104, 104, 104),
                    fontSize: 12,
                    overflow: TextOverflow.fade),
              ),
            ),
          ),
        )
    ]);
  }
}
