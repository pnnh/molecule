
#ifndef MACOS_MAC_WINDOW_H
#define MACOS_MAC_WINDOW_H

#include <QtCore>
#include <QtGui>

Q_FORWARD_DECLARE_OBJC_CLASS(NSWindow);

class MacWindow {
public:
    MacWindow(QWindow *contentWindow);

    void setVisible(bool visible);

    void show();

protected:
    void createNSWindow();

    void destroyNSWindow();

private:
    QWindow *m_window = nullptr;
    NSWindow *m_nsWindow = nullptr;
    QString m_titleText = "MacWindow";
    bool m_visible = true;
};

#endif //MACOS_MAC_WINDOW_H