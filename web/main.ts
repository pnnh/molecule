// import { default as Module2 } from 'polaris-wasm'

// const Module = {
//     locateFile: function (path, scriptDirectory) {
//         console.log('locateFile222', path, scriptDirectory)
//         return 'node_modules/polaris-wasm/polaris-wasm.wasm'
//     }
// }
// console.log('Module', Module2)

// const module2 = await Module2(Module)
// console.log('abc:', module2.lerp(1, 2, 0.5))


async function testWasm() {

    const Module = {
        locateFile: function (path: string, scriptDirectory: string) {
            console.log('locateFile222', path, scriptDirectory)
            return 'node_modules/polaris-wasm/polaris-wasm.wasm'
        }
    }
    // @ts-expect-error 测试目的
    const MainModule = await import('polaris-wasm')
    const {default: abc} = MainModule
    console.log('abc:', MainModule)
    const module2 = await abc(Module)
    console.log('default', module2.lerp(1, 2, 0.5))
}


function testBase58() {

}

export {}
