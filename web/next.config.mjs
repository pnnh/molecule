import path from 'path'
import remarkGfm from 'remark-gfm'
import bundleAnalyzerPlugin from '@next/bundle-analyzer'
import * as NextMdx from '@next/mdx'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/** @type {import('next').NextConfig} */
let nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    experimental: {
        esmExternals: true,
    },
    webpack: function (config, {isServer, dev}) {
        config.experiments = {
            asyncWebAssembly: true,
            syncWebAssembly: true,
            topLevelAwait: true,
            layers: true,
        };
        return config;
    },
    transpilePackages: ['polaris-wasm-browser', 'polaris-wasm-server'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'localhost'
            },
            {
                protocol: 'https',
                hostname: 'static.calieo.dev'
            },
            {
                protocol: 'https',
                hostname: 'static.calieo.xyz'
            }
        ]
    },
    compress: process.env.ENV === 'production',
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
}

// 使用bundleAnalyzer插件
nextConfig = bundleAnalyzerPlugin({
    enabled: process.env.ANALYZE === 'true'
})(nextConfig)

// 导出nextjs配置
const withMdx = NextMdx.default(nextConfig, {
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
    },
})

export default withMdx(nextConfig)
