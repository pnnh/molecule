
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Text("Hello, World!")
            HStack {
                Spacer()
                Text("Top Text")
                Spacer()
                Text("Bottom Text")
                Spacer()
                Button(action: {
                    print("follow")
                    
                }){
                    Text("click")
                }
            }
            Spacer()
        }
    
    }
}