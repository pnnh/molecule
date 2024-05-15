#include <iostream>
#include <random>
#include <QDebug>
#include <utility>
#include "voronoi.h"

Voronoi::Voronoi(QObject *parent) : QObject(parent)
{

}

QString Voronoi::random(QString text, int length, bool symbol) {
  QString qmltext = std::move(text);
  qmltext != nullptr ? qDebug() << qmltext
                  : qDebug() << "text = null";

  int numberLength = 10, letterLength = 26, uppercaseLength = 26, symbolLength = (int)charsSymbol.length();

  std::random_device rd;
  auto gen = std::default_random_engine(rd());

  int charsLength = numberLength /*数字集合长度*/
      + letterLength /*大写字母长度*/
      + uppercaseLength /*小写字母长度*/;

  if (symbol) {
    charsLength += symbolLength;
  }
  std::uniform_int_distribution<int> dis(0, charsLength - 1);

  std::cout << "some random numbers between 1 and 10: ";

  std::string output;

  int i = 0;
  while(i++ < length) {
    int index = dis(gen);
    if (index < numberLength) {
      output += charsNumber[index];
      continue;
    }
    if (index < numberLength + letterLength) {
      output += charsLetter[index - numberLength];
      continue;
    }
    if (index < numberLength + letterLength + uppercaseLength) {
      output += charsUppercaseLetter[index - numberLength - letterLength];
      continue;
    }
    if (symbol) {
      output += charsSymbol[index - numberLength - letterLength - uppercaseLength];
    }
  }
  std::cout << output << "\t" << output.length() << std::endl;

  return QString::fromStdString(output);
}
