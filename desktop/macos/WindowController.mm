//
// Created by Larry on 2024/1/25.
//

#include "WindowController.h"

@interface MacWindowController ()

@property(strong) IBOutlet NSWindow *window;
@end

@implementation MacWindowController

- (void)windowDidLoad {
    [super windowDidLoad];
    NSLog(@"Something windowDidLoad");
    // Implement this method to handle any initialization after your window controller's window has been loaded from its nib file.
}

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
    // Insert code here to initialize your application
}


- (void)applicationWillTerminate:(NSNotification *)aNotification {
    // Insert code here to tear down your application
}


- (void)windowWillClose:(NSNotification *)notification {
    NSLog(@"Something To Print");
    [NSApp terminate:self];
}


@end