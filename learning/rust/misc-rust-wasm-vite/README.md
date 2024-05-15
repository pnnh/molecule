Rust编译Web Assembly，并构建npm包示例

根据 https://developer.mozilla.org/zh-CN/docs/WebAssembly/Rust_to_wasm 教程实现

构建完npm包之后通过简单的vitejs项目演示用法

rust构建wasm文件命令
```bash
wasm-pack build --scope pnnh --target web
```