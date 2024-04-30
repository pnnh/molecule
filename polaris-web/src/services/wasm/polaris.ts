// import {default as Module2} from 'polaris-wasm' 
 
// const Module = {
//     locateFile: function (path: string, scriptDirectory: string) {
//         console.log('locateFile222', path, scriptDirectory)
//         return 'node_modules/polaris-wasm/polaris-wasm.wasm'
//     }
// } 
// console.log('Module', Module2)
 
// const module2 = await Module2(Module)
// console.log('abc:', module2.lerp(1, 2, 0.5))



import { MainModule } from 'polaris-wasm'

interface IModule {
    locateFile: (path: string, scriptDirectory: string) => string
}


const Module = {
    locateFile: function (path: string, scriptDirectory: string) {
        console.log('locateFile222', path, scriptDirectory)
        return 'node_modules/polaris-wasm/polaris-wasm.wasm'
    }
}
const MainModuleFactory = await import('polaris-wasm')
const abc = MainModuleFactory.default as (module: IModule) => Promise<MainModule>
console.log('abc:', MainModuleFactory)
const module2 = await abc(Module)
console.log('default', module2.lerp(1, 2, 0.5))


export function lerp(a: number, b: number, t: number): number {
    return module2.lerp(a, b, t)
}