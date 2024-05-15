//
// Created by Larry on 2022/8/30.
//

#ifndef QT_WASM_INPUT_METHOD_TEXTBALLOON_H
#define QT_WASM_INPUT_METHOD_TEXTBALLOON_H

#include <QObject>
#include <qqmlregistration.h>
#include <QQuickPaintedItem>

class TextBalloon : public QQuickPaintedItem {
Q_OBJECT
    Q_PROPERTY(QString text WRITE setText)
    QML_ELEMENT

public:
    static std::shared_ptr<TextBalloon> defaultBalloon;

    TextBalloon(QQuickItem *parent = nullptr);

    ~TextBalloon();

    void paint(QPainter *painter) override;

    void setText(QString text);

    void appendText(QString text);

    void setCompositionText(QString compositionEvent, QString text);

    void deleteContent();

    void insertLineBreak();

    void setActive();

protected:
    void timerEvent(QTimerEvent *event) override;

    int m_nTimerId;

private:
    void mousePressEvent(QMouseEvent *event) override;

    void mouseMoveEvent(QMouseEvent *event) override;

    void mouseReleaseEvent(QMouseEvent *event) override;

    void showHtmlTextArea();

    QString text;
    QString compositionText;
    bool isActive;
    int blinkCount;
    QPointF cursorPosition;
};

#endif //QT_WASM_INPUT_METHOD_TEXTBALLOON_H
