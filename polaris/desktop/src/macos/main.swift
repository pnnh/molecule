import Foundation
import Cocoa

print("Hello, world!")

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
//app.setActivationPolicy(.regular)
app.run()
//app.activate(ignoringOtherApps: true)

_ = NSApplicationMain(CommandLine.argc, CommandLine.unsafeArgv)
