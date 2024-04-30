// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
interface WasmModule {
  _main(_0: number, _1: number): number;
}

interface EmbindModule {
  lerp(_0: number, _1: number, _2: number): number;
}
export type MainModule = WasmModule & EmbindModule;
