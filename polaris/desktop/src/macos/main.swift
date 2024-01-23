import Foundation
import Cocoa

print("Hello, world!")

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.run()

_ = NSApplicationMain(CommandLine.argc, CommandLine.unsafeArgv)
