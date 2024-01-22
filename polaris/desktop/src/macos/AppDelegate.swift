import Cocoa
import SwiftUI

class AppDelegate: NSObject, NSApplicationDelegate {

var windowController: MainWindowController? = nil

    func applicationDidFinishLaunching(_ aNotification: Notification) {
        app.setActivationPolicy(.regular)
        app.activate(ignoringOtherApps: true)

        let viewController = ViewController()
        let window = NSWindow(
            contentRect: NSRect(x: 0, y: 0, width: 480, height: 270),
            styleMask: [.miniaturizable, .closable, .resizable, .titled],
            backing: .buffered, defer: false)
//        window.isReleasedWhenClosed = true
        window.center()
        window.title = "No Storyboard Window"
        window.contentViewController = viewController
        window.makeKeyAndOrderFront(nil)
//        window.delegate = windowController

       windowController = MainWindowController(window: window)


//        windowController?.window = window

        windowController?.window?.delegate = windowController
//        windowController?.window?.contentViewController = viewController
        windowController?.showWindow(self)

    }
}