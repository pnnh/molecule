import Cocoa

class MainWindowController: NSWindowController, NSWindowDelegate {
    func windowWillClose(_ notification: Notification) {
        print("Window will close")
        NSApplication.shared.terminate(self)
    }
}