// 调用c++lib
import cpplib
import Darwin   // 测试系统调用
import swiftlib
import clib

print(String(cString: HelloFromC()))      // 调用C方法

print(String(cString: HelloFromCpp()))    // 调用cpp方法

print(HelloFromSwift())    // 调用Swift方法

print(sin(1.0))     // 测试调用系统API