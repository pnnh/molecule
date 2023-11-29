
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/flutter_svg.dart';

class EFuncGroupWidget extends ConsumerWidget {
  const EFuncGroupWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
        width: 48,
        color: Color(0xffF2F2F2),
        padding: EdgeInsets.only(top: 24, left: 0, bottom: 24, right: 0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              child: Column(children: [
                Container(
                  child: SvgPicture.asset(
                    "static/images/icons/book.svg",
                    color: Color(0xff000000),
                    height: 20,
                    width: 20,
                  ),
                ),
                const SizedBox(
                  height: 16,
                ),
                Container(
                  child: SvgPicture.asset(
                    "static/images/icons/box.svg",
                    color: Color(0xff000000),
                  ),
                )
              ]),
            ),
            Container(
              child: Column(children: [
                Container(
                  child: SvgPicture.asset(
                    "static/images/icons/user.svg",
                    color: Color(0xff000000),
                  ),
                ),
                const SizedBox(
                  height: 16,
                ),
                Container(
                  child: SvgPicture.asset(
                    "static/images/icons/setting.svg",
                    color: Color(0xff000000),
                  ),
                )
              ]),
            ),
          ],
        ));
  }
}
