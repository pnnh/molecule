### 示例引用生成的wasm文件

```html

<!doctype html>
<html>
  <script>
    var Module = {
      onRuntimeInitialized: function() {
        console.log('lerp result: ' + Module.lerp(1, 2, 0.5));
      }
    };
  </script>
  <script src="pulsar-wasm.js"></script>
</html>

```