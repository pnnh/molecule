import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { visualizer } from 'rollup-plugin-visualizer'
import strip from '@rollup/plugin-strip'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import del from 'rollup-plugin-delete'
import json from '@rollup/plugin-json'

export default [{
  input: 'src/index.tsx',
  output: {
    file: 'lib/index.mjs',
    format: 'esm',
    sourcemap: true,
    assetFileNames: '[name][extname]'
  },
  external: ['react', 'util', 'buffer', 'events', 'os', 'fs', 'path', 'http', 'stream', 'https', 'zlib', 'tty'],
  plugins: [
    del({ targets: 'lib/*' }),
    commonjs(),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      moduleDirectories: ['node_modules', 'src'],
      preferBuiltins: false
    }),
    typescript(),
    json(),
    postcss({
      modules: true
    }),
    //scss({fileName: 'bundle.css'}),
    strip({
      include: ['**/*.(js|mjs|ts|tsx)'],
      debugger: true,
      functions: ['console.log', 'console.debug'],
      sourceMap: true
    }),
    
    visualizer({
      filename: 'lib/status.html'
    })
  ]
}
// {
//   input: 'lib/dts/index.d.ts',
//   output: [{ file: 'lib/index.d.ts' }],
//   external: [/\.(css|scss)$/],
//   plugins: [
//     dts()
//   ]
// }
]
