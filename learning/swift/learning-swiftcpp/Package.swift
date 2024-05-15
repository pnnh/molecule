// swift-tools-version:5.0
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "swiftcpp",
    products: [
        .executable(name: "swift-exec", targets: ["swift-exec"] ),
    ],
    targets: [
        .target(name: "clib", dependencies: []),
        .target(name: "cpplib", dependencies: []),
        .target(name: "swiftlib", dependencies: []),
        .target(name: "c-exec", dependencies: ["clib", "cpplib"]),
        .target(name: "cpp-exec", dependencies: ["clib", "cpplib"]),
        .target(name: "swift-exec", dependencies: ["clib", "cpplib", "swiftlib"]),
    ],
    cLanguageStandard: .c11,
    cxxLanguageStandard: .cxx14
)
