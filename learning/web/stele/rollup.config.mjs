import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { visualizer } from 'rollup-plugin-visualizer'
import strip from '@rollup/plugin-strip'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import pkg from './package.json' with {type: 'json'};
import postcss from 'rollup-plugin-postcss'
import scss from 'rollup-plugin-scss'
import del from 'rollup-plugin-delete'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser';
import autoprefixer from 'autoprefixer'

const commonConfig = [{
  input: 'src/index.common.tsx',
  output: {
    file: 'lib/index.common.mjs',
    format: 'esm',
    sourcemap: true,
    assetFileNames: '[name][extname]'
  },
  external: [
    ...Object.keys(pkg.dependencies || {})
  ],
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
    scss({ fileName: 'index.css' }),
    postcss({
      plugins: [autoprefixer()],
      sourceMap: true,
      extract: true,
      minimize: true,
      writeDefinitions: true,
      modules: true,
      namedExports: true,
    }),
    strip({
      include: ['**/*.(js|mjs|ts|tsx)'],
      debugger: true,
      functions: ['console.log', 'console.debug'],
      sourceMap: true
    }),
    terser(),
    visualizer({
      filename: 'build/status.common.html'
    })
  ]
},{
  input: 'src/index.common.tsx',
  output: {
    file: 'lib/index.common.cjs',
    format: 'cjs',
    sourcemap: true,
    assetFileNames: '[name][extname]'
  },
  external: [
    ...Object.keys(pkg.dependencies || {})
  ],
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
    strip({
      include: ['**/*.(js|mjs|ts|tsx)'],
      debugger: true,
      functions: ['console.log', 'console.debug'],
      sourceMap: true
    }),
    terser(),
    visualizer({
      filename: 'build/status.common.html'
    })
  ]
},
{
  input: 'lib/dts/index.common.d.ts',
  output: [{ file: 'lib/index.common.d.ts' }],
  external: [/\.(css|scss)$/],
  plugins: [
    dts()
  ]
}
]

const serverConfig = [{
  input: 'src/index.server.tsx',
  output: {
    file: 'lib/index.server.mjs',
    format: 'esm',
    sourcemap: true,
    assetFileNames: '[name][extname]'
  },
  external: ['react'],
  plugins: [
    commonjs(),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      moduleDirectories: ['node_modules', 'src'],
      preferBuiltins: false
    }),
    typescript(),
    json(),
    strip({
      include: ['**/*.(js|mjs|ts|tsx)'],
      debugger: true,
      functions: ['console.log', 'console.debug'],
      sourceMap: true
    }),
    terser(),
    visualizer({
      filename: 'build/status.server.html'
    })
  ]
},{
  input: 'src/index.server.tsx',
  output: {
    file: 'lib/index.server.cjs',
    format: 'cjs',
    sourcemap: true,
    assetFileNames: '[name][extname]'
  },
  external: ['react'],
  plugins: [
    commonjs(),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      moduleDirectories: ['node_modules', 'src'],
      preferBuiltins: false
    }),
    typescript(),
    json(),
    strip({
      include: ['**/*.(js|mjs|ts|tsx)'],
      debugger: true,
      functions: ['console.log', 'console.debug'],
      sourceMap: true
    }),
    terser(),
    visualizer({
      filename: 'build/status.server.html'
    })
  ]
},
{
  input: 'lib/dts/index.server.d.ts',
  output: [{ file: 'lib/index.server.d.ts' }],
  external: [/\.(css|scss)$/],
  plugins: [
    dts()
  ]
}
]

const clientConfig = [{
  input: 'src/index.client.tsx',
  output: {
    file: 'lib/index.client.mjs',
    format: 'esm',
    sourcemap: true,
    assetFileNames: '[name][extname]'
  },
  external: ['react'],
  plugins: [
    commonjs(),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      moduleDirectories: ['node_modules', 'src'],
      preferBuiltins: false
    }),
    typescript(),
    json(),
    strip({
      include: ['**/*.(js|mjs|ts|tsx)'],
      debugger: true,
      functions: ['console.log', 'console.debug'],
      sourceMap: true
    }),
    terser(),
    visualizer({
      filename: 'build/status.client.html'
    })
  ]
},{
  input: 'src/index.client.tsx',
  output: {
    file: 'lib/index.client.cjs',
    format: 'cjs',
    sourcemap: true,
    assetFileNames: '[name][extname]'
  },
  external: ['react'],
  plugins: [
    commonjs(),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      moduleDirectories: ['node_modules', 'src'],
      preferBuiltins: false
    }),
    typescript(),
    json(),
    strip({
      include: ['**/*.(js|mjs|ts|tsx)'],
      debugger: true,
      functions: ['console.log', 'console.debug'],
      sourceMap: true
    }),
    terser(),
    visualizer({
      filename: 'build/status.client.html'
    })
  ]
},
{
  input: 'lib/dts/index.client.d.ts',
  output: [{ file: 'lib/index.client.d.ts' }],
  external: [/\.(css|scss)$/],
  plugins: [
    dts()
  ]
}
]

const exportConfig = commonConfig.concat(serverConfig).concat(clientConfig)

export default exportConfig