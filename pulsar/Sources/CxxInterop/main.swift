import CxxTest

public struct CxxInterop {
    public static func main() {
        let result = cxxFunction(7)
        print(result)
    }
}

CxxInterop.main()