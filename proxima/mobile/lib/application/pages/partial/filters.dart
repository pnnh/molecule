
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/flutter_svg.dart';

class VFiltersWidget extends ConsumerWidget {
  const VFiltersWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    var selectedKey = "";
    return Container(
      child: Column(children: [
        Container(
          height: 32,
          padding: EdgeInsets.only(left: 16, right: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                "筛选",
                style: TextStyle(fontSize: 14),
              ),
            ],
          ),
        ),
        Container(
          height: 32,
          padding: EdgeInsets.only(left: 16, right: 16),
          color:
              selectedKey == "bigimg" ? Color(0xffD3D3D3) : Colors.transparent,
          child: MouseRegion(
              onEnter: (event) {
                // setState(() {
                //   selectedKey = "bigimg";
                // });
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: EdgeInsets.only(
                            left: 0, right: 8, top: 0, bottom: 0),
                        child: GestureDetector(
                            onTap: () {},
                            child: SvgPicture.asset(
                              "static/images/icons/bigimg.svg",
                              color: Color(0xff444444),
                              height: 16,
                              width: 16,
                              //    fit: BoxFit.fitWidth
                            )),
                      ),
                      Text(
                        "大图片",
                        style: TextStyle(fontSize: 12),
                      ),
                    ],
                  ),
                  Text("2819")
                ],
              )),
        ),
        Container(
          height: 32,
          padding: EdgeInsets.only(left: 16, right: 16),
          color:
              selectedKey == "jietu" ? Color(0xffD3D3D3) : Colors.transparent,
          child: MouseRegion(
              onEnter: (event) {
                // setState(() {
                //   selectedKey = "jietu";
                // });
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: EdgeInsets.only(
                            left: 0, right: 8, top: 0, bottom: 0),
                        child: GestureDetector(
                            onTap: () {},
                            child: SvgPicture.asset(
                              "static/images/icons/jietu.svg",
                              color: Color(0xff444444),
                              height: 16,
                              width: 16,
                              //    fit: BoxFit.fitWidth
                            )),
                      ),
                      Text(
                        "屏幕截图",
                        style: TextStyle(fontSize: 12),
                      ),
                    ],
                  ),
                  Text("123")
                ],
              )),
        ),
        Container(
          height: 32,
          padding: EdgeInsets.only(left: 16, right: 16),
          color:
              selectedKey == "renwu" ? Color(0xffD3D3D3) : Colors.transparent,
          child: MouseRegion(
              onEnter: (event) {
                // setState(() {
                //   selectedKey = "renwu";
                // });
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: EdgeInsets.only(
                            left: 0, right: 8, top: 0, bottom: 0),
                        child: GestureDetector(
                            onTap: () {},
                            child: SvgPicture.asset(
                              "static/images/icons/renwu.svg",
                              color: Color(0xff444444),
                              height: 16,
                              width: 16,
                              //    fit: BoxFit.fitWidth
                            )),
                      ),
                      Text(
                        "人物",
                        style: TextStyle(fontSize: 12),
                      ),
                    ],
                  ),
                  Text("457")
                ],
              )),
        ),
        Container(
          height: 32,
          padding: EdgeInsets.only(left: 16, right: 16),
          color:
              selectedKey == "dongwu" ? Color(0xffD3D3D3) : Colors.transparent,
          child: MouseRegion(
              onEnter: (event) {
                // setState(() {
                //   selectedKey = "dongwu";
                // });
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: EdgeInsets.only(
                            left: 0, right: 8, top: 0, bottom: 0),
                        child: GestureDetector(
                            onTap: () {},
                            child: SvgPicture.asset(
                              "static/images/icons/dongwu.svg",
                              color: Color(0xff444444),
                              height: 16,
                              width: 16,
                              //    fit: BoxFit.fitWidth
                            )),
                      ),
                      Text(
                        "动物",
                        style: TextStyle(fontSize: 12),
                      ),
                    ],
                  ),
                  Text("413")
                ],
              )),
        ),
        Container(
          height: 32,
          padding: EdgeInsets.only(left: 16, right: 16),
          color:
              selectedKey == "wenzi" ? Color(0xffD3D3D3) : Colors.transparent,
          child: MouseRegion(
              onEnter: (event) {
                // setState(() {
                //   selectedKey = "wenzi";
                // });
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: EdgeInsets.only(
                            left: 0, right: 8, top: 0, bottom: 0),
                        child: GestureDetector(
                            onTap: () {},
                            child: SvgPicture.asset(
                              "static/images/icons/wenzi.svg",
                              color: Color(0xff444444),
                              height: 16,
                              width: 16,
                              //    fit: BoxFit.fitWidth
                            )),
                      ),
                      Text(
                        "带文字",
                        style: TextStyle(fontSize: 12),
                      ),
                    ],
                  ),
                  Text("1270")
                ],
              )),
        ),
        Container(
          height: 32,
          padding: EdgeInsets.only(left: 16, right: 16),
          color:
              selectedKey == "chongfu" ? Color(0xffD3D3D3) : Colors.transparent,
          child: MouseRegion(
              onEnter: (event) {
                // setState(() {
                //   selectedKey = "chongfu";
                // });
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: EdgeInsets.only(
                            left: 0, right: 8, top: 0, bottom: 0),
                        child: GestureDetector(
                            onTap: () {},
                            child: SvgPicture.asset(
                              "static/images/icons/chongfu.svg",
                              color: Color(0xff444444),
                              height: 16,
                              width: 16,
                              //    fit: BoxFit.fitWidth
                            )),
                      ),
                      Text(
                        "重复图片",
                        style: TextStyle(fontSize: 12),
                      ),
                    ],
                  ),
                  Text("57")
                ],
              )),
        ),
        Container(
          height: 32,
          padding: EdgeInsets.only(left: 16, right: 16),
          color: selectedKey == "lajitong"
              ? Color(0xffD3D3D3)
              : Colors.transparent,
          child: MouseRegion(
              onEnter: (event) {
                // setState(() {
                //   selectedKey = "lajitong";
                // });
              },
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: EdgeInsets.only(
                            left: 0, right: 8, top: 0, bottom: 0),
                        child: GestureDetector(
                            onTap: () {},
                            child: SvgPicture.asset(
                              "static/images/icons/lajitong.svg",
                              color: Color(0xff444444),
                              height: 16,
                              width: 16,
                              //    fit: BoxFit.fitWidth
                            )),
                      ),
                      Text(
                        "已删除",
                        style: TextStyle(fontSize: 12),
                      ),
                    ],
                  ),
                  Text("35")
                ],
              )),
        ),
      ]),
    );
  }
}
