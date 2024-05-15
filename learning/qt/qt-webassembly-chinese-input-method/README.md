尝试实现QT WebAssembly下的中文输入

# Webassembly功能测试

## CLion下测试

```shell
# 配置了以下cmake参数
-DCMAKE_PREFIX_PATH=~/Qt/6.2.0/macos/lib/cmake
-DCMAKE_TOOLCHAIN_FILE:PATH=~/Qt/6.2.0/wasm_32/lib/cmake/Qt6/qt.toolchain.cmake
```

## 启动本机http-server服务

```shell
npm i -g http-server   # 安装工具
# 在根目录下执行
http-server --cors
```

参考assets/index.html修改cmake-build-debug目录下的myapp.html，在适当位置添加如下内容
```shell
#example {
    height: 1px;
    width: 1px;
    display: none;
    position: fixed;
    border: none;
    outline: none;
    caret-color: transparent;
    background: transparent;
    color: transparent;
    overflow: hidden;
    resize: none;
}
<textarea id="example" rows="8" cols="25"></textarea>
<script type="text/javascript" src="/assets/scripts/jquery-3.6.1.min.js"></script>
<script type="text/javascript" src="/assets/scripts/index.js"></script>
```

之后可以在工程主目录执行http-server，打开浏览器并定位到myapp.html以查看效果

注意不同qt和emscripten版本编译出的html和js文件内容可能不同

通过window.moduleConfig可以引用到暴露出的C++方法

通过embind形式暴露的C++方法，不会出现在生成的js文件里，而是加载wasm文件编译后会出现
