#include "macwindow.h"
#import "WindowController.h"
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

    NSRect frame = NSMakeRect(200, 200, 1024, 688);
    m_nsWindow =
            [[NSWindow alloc] initWithContentRect:frame
                                        styleMask:styleMask
                                          backing:NSBackingStoreBuffered
                                            defer:NO];

    m_nsWindow.titleVisibility = NSWindowTitleVisible;
    m_nsWindow.title = m_titleText.toNSString();
    m_nsWindow.releasedWhenClosed = NO;
    [m_nsWindow center];

    NSToolbar *toolbar = [[NSToolbar alloc] initWithIdentifier:@"main"];
    m_nsWindow.toolbar = toolbar;
    m_nsWindow.contentView = (__bridge NSView *) reinterpret_cast<void *>(m_window->winId());
    m_nsWindow.titlebarAppearsTransparent = YES;
    m_nsWindow.title = @"北极星笔记";
    auto *controller = [[MacWindowController alloc] initWithWindow:m_nsWindow];
    m_nsWindow.delegate = controller;
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

