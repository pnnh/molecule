//
// Created by Larry on 2021/11/16.
//

#include "changeColor.h"
#include <QDateTime>
#include <QColor>
#include <QVariant>
#include <QRandomGenerator>

ChangeQmlColor::ChangeQmlColor(QObject *target, QObject *parent) :
  QObject(parent), m_timer(this), m_target(target) {
  connect(&m_timer, SIGNAL(timeout()), this, SLOT(onTimeout()));
  m_timer.start(1000);
}
ChangeQmlColor::~ChangeQmlColor() {

}

int randRgb() {
  return QRandomGenerator::global()->bounded(1024) % 256;
}

void ChangeQmlColor::onTimeout() {
  QColor color = QColor::fromRgb(randRgb(), randRgb(), randRgb());
  m_target->setProperty("color", color);
}