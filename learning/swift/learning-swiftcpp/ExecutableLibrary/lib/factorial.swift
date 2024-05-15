public func factorial(x: Int) -> Int {
    if x <= 0 {
        return 1
    }
    return x * factorial(x: x - 1)
}