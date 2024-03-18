### 示例引用生成的wasm文件

在生成的目录 build/web/web 下创建 test.mjs 文件，内容如下：

```javascript

import { dirname } from "path";
globalThis.__dirname = dirname(import.meta.url);
import { createRequire } from 'module';
globalThis.require = createRequire(import.meta.url);

var Module = {
    locateFile: function (path, scriptDirectory) {
        console.log('locateFile', path, scriptDirectory)
        return path;
    }

}

import Module2 from './pulsar-wasm.mjs'

console.log('Module', Module2)

var module2 = new Module2(Module);

console.log('lerp result: ' + module2);

```

将生成的pulsar-wasm.js文件改名为pulsar-wasm.mjs
然后执行：

```bash
node test.mjs
```
将输出以下内容：
```
locateFile pulsar-wasm.wasm file:///home/azureuser/Projects/multiverse/multiverse/pulsar/build/web/web/
test.mjs:11
lerp result: [object Promise]
test.mjs:24
lerp(2.4, 4.3, 0.5) = 3.35
```