import init, {greet} from '@pnnh/hello-wasm'

init().then((_exports) => {
  greet('WebAssembly')
})