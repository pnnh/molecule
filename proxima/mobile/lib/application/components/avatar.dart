import 'package:flutter/material.dart';

class AvatarWidget extends StatelessWidget {
  const AvatarWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(4.0),
      child: const SizedBox(
        width: 36,
        height: 36,
        child: Image(image: AssetImage('static/images/avatar.jpeg')),
      ),
    );
  }
}
