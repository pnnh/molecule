

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class VSNavbar extends ConsumerWidget {

  const VSNavbar({super.key});


  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      color: const Color(0xFFF2F2F2),
      width: 56,
      child: Column(
          children: [
            const SizedBox(height: 16,),
            Container(
              child: const Image(image: AssetImage('static/images/console/file-copy-line.png'),
              fit: BoxFit.cover),
            ),
          ]),
    );
  }
}