// Copyright (C) 2016 The Qt Company Ltd.
// SPDX-License-Identifier: LicenseRef-Qt-Commercial OR BSD-3-Clause

#include "beziercurve.h"

#include <QtQuick/qsgnode.h>
#include <QtQuick/qsgflatcolormaterial.h>

//! [1]
BezierCurve::BezierCurve(QQuickItem *parent)
    : QQuickItem(parent), m_p1(0, 0), m_p2(1, 0), m_p3(0, 1), m_p4(1, 1), m_segmentCount(5) {
  setFlag(ItemHasContents, true);
}
//! [1]

//! [2]
BezierCurve::~BezierCurve() = default;
//! [2]

//! [3]
void BezierCurve::setP1(const QPointF &p) {
  if (p == m_p1)
    return;

  m_p1 = p;
  emit p1Changed(p);
  update();
}
//! [3]

void BezierCurve::setP2(const QPointF &p) {
  if (p == m_p2)
    return;

  m_p2 = p;
  emit p2Changed(p);
  update();
}

void BezierCurve::setP3(const QPointF &p) {
  if (p == m_p3)
    return;

  m_p3 = p;
  emit p3Changed(p);
  update();
}

void BezierCurve::setP4(const QPointF &p) {
  if (p == m_p4)
    return;

  m_p4 = p;
  emit p4Changed(p);
  update();
}

void BezierCurve::setSegmentCount(int count) {
  if (m_segmentCount == count)
    return;

  m_segmentCount = count;
  emit segmentCountChanged(count);
  update();
}

//! [4]
QSGNode *BezierCurve::updatePaintNode(QSGNode *oldNode, UpdatePaintNodeData *) {
  QSGGeometryNode *node = nullptr;
  QSGGeometry *geometry = nullptr;

  if (!oldNode) {
    node = new QSGGeometryNode;
//! [4] //! [5]
    geometry = new QSGGeometry(QSGGeometry::defaultAttributes_Point2D(), m_segmentCount);
    geometry->setLineWidth(2);
    geometry->setDrawingMode(QSGGeometry::DrawLineStrip);
    node->setGeometry(geometry);
    node->setFlag(QSGNode::OwnsGeometry);
//! [5] //! [6]
    auto *material = new QSGFlatColorMaterial;
    material->setColor(QColor(255, 0, 0));
    node->setMaterial(material);
    node->setFlag(QSGNode::OwnsMaterial);
//! [6] //! [7]
  } else {
    node = static_cast<QSGGeometryNode *>(oldNode);
    geometry = node->geometry();
    geometry->allocate(m_segmentCount);
  }
//! [7]

//! [8]
  QSizeF itemSize = size();
  QSGGeometry::Point2D *vertices = geometry->vertexDataAsPoint2D();
//    for (int i = 0; i < m_segmentCount; ++i) {
//        qreal t = i / qreal(m_segmentCount - 1);
//        qreal invt = 1 - t;

//        QPointF pos = invt * invt * invt * m_p1
//                    + 3 * invt * invt * t * m_p2
//                    + 3 * invt * t * t * m_p3
//                    + t * t * t * m_p4;

//        float x = pos.x() * itemSize.width();
//        float y = pos.y() * itemSize.height();

//        vertices[i].set(x, y);
//    }
//  qreal x = 0, y = 0;
//  int index = 0;
//  qreal width = itemSize.width();
//  qreal height = itemSize.height();
//  qreal xStep = width / 8;
//  qreal yStep = height / 8;
//  for (int i = 0; i < 4; i++) {
//    for (int j = 0; j < 8; j++) {
//      if (i == 0) {
//        x = j == 8 ? width : j * xStep;
//        y = 0;
//      } else if (i == 2) {
//        x = width;
//        y = j == 8 ? height : j * yStep;
//      } else if (i == 3) {
//        x = j == 8 ? 0 : width - j * xStep;
//        y = height;
//      } else {
//        x = 0;
//        y = j == 8 ? 0 : height - j * yStep;
//      }
//
//      vertices[index++].set(x, y);
//    }
//
//  }

  qreal width = itemSize.width();
  qreal height = itemSize.height();
  vertices[0].set(0, 0);
  vertices[1].set(width, 0);
  vertices[2].set(width, height);
  vertices[3].set(0, height);
  vertices[4].set(0, 0);
  node->markDirty(QSGNode::DirtyGeometry);
//! [8]


//! [9]
  return node;
}
//! [9]
