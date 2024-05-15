//
// Created by Larry on 2022/2/1.
//

#include "mytype.h"
#include <iostream>

int MyType::answer() const {
  std::cout << "answer" << std::endl;
  return 9;
}

void MyType::setAnswer(int answer)  {
  std::cout << "setAnswer " << answer << std::endl;
  emit answerChanged();
}
