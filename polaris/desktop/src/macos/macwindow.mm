#include "macwindow.h"
#import <AppKit/AppKit.h>

MacWindow::MacWindow(QWindow *window)
        : m_window(window) {
}

void MacWindow::createNSWindow() {
    qDebug() << "createNSWindow";
    if (m_nsWindow)
        return;

    auto styleMask = NSWindowStyleMaskTitled | NSWindowStyleMaskClosable |
                     NSWindowStyleMaskMiniaturizable | NSWindowStyleMaskResizable;

    NSRect frame = NSMakeRect(200, 200, 320, 200);
    m_nsWindow =
            [[NSWindow alloc] initWithContentRect:frame
                                        styleMask:styleMask
                                          backing:NSBackingStoreBuffered
                                            defer:NO];

    m_nsWindow.titleVisibility = NSWindowTitleVisible;
    m_nsWindow.title = m_titleText.toNSString();

    NSToolbar *toolbar = [[NSToolbar alloc] initWithIdentifier:@"main"];
    m_nsWindow.toolbar = toolbar;
    m_nsWindow.contentView = (__bridge NSView *) reinterpret_cast<void *>(m_window->winId());
}

void MacWindow::setVisible(bool visible) {
    qDebug() << "setVisible" << visible;
    m_visible = visible;
    if (visible) {
        createNSWindow();
        [m_nsWindow makeKeyAndOrderFront:nil];
    } else {

    }
}

void MacWindow::show() {
    setVisible(true);
}

