// swift-tools-version:5.10
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "swiftcpp",
    products: [
        .executable(name: "CxxInterop", targets: ["CxxInterop"] ),
        
    ],
    targets: [
        .target(name: "CxxTest", dependencies: []),
        .executableTarget(name: "CxxInterop", dependencies: ["CxxTest"],
                        swiftSettings: [.interoperabilityMode(.Cxx)]),
    ],
    cLanguageStandard: .c17,
    cxxLanguageStandard: .cxx20
)
