const path = require('path')
const bundleAnalyzerPlugin = require('@next/bundle-analyzer')


/** @type {import('next').NextConfig} */
let nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
  },
  webpack: function (config, { isServer, dev }) {
    config.experiments = {
      asyncWebAssembly: true,
      syncWebAssembly: true,
      topLevelAwait: true,
      layers: true,
    };
    if (isServer) {
      config.output.webassemblyModuleFilename =
        './../static/wasm/[modulehash].wasm'
    } else {
      config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm'
    } 
    return config;
  },
  //transpilePackages: ['polaris-wasm'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'polaris.huable.dev'
      },
      {
        protocol: 'https',
        hostname: 'polaris.huable.xyz'
      },
      {
        protocol: 'https',
        hostname: 'static.huable.dev'
      },
      {
        protocol: 'https',
        hostname: 'static.huable.xyz'
      }
    ]
  },
  compress: process.env.ENV === 'production',
    sassOptions: {
  includePaths: [path.join(__dirname, 'styles')]
}
}


// class WasmChunksFixPlugin {
//   apply(compiler) {
//     compiler.hooks.thisCompilation.tap('WasmChunksFixPlugin', (compilation) => {
//       compilation.hooks.processAssets.tap(
//         { name: 'WasmChunksFixPlugin' },
//         (assets) =>
//           Object.entries(assets).forEach(([pathname, source]) => {
//             if (!pathname.match(/\.wasm$/)) return;
//             compilation.deleteAsset(pathname);

//             const name = pathname.split('/')[1];
//             const info = compilation.assetsInfo.get(pathname);
//             compilation.emitAsset(name, source, info);
//           })
//       );
//     });
//   }
// }

// 使用bundleAnalyzer插件
nextConfig = bundleAnalyzerPlugin({
  enabled: process.env.ANALYZE === 'true'
})(nextConfig)

// 导出nextjs配置
module.exports = nextConfig