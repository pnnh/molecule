// roboto字体相关样式引用
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// 代码高亮样式引用
import '~/highlight.js/styles/github.css'
// 全局自定义样式引用
import './global.css'

import {Metadata} from 'next'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import {Experimental_CssVarsProvider as CssVarsProvider} from '@mui/material/styles';
import theme from './theme';

// 隔几秒重新验证下数据
export const revalidate = 5
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: '北极星笔记'
}

export default async function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang='zh'>
        <head>
            <base href="/"/>
            <meta charSet="utf-8"/>
            <meta name="viewport"
                  content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"/>
            <meta name="renderer" content="webkit"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <meta name="robots" content="index,follow"/>
            <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
            <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
        </head>
        <body>
        <AppRouterCacheProvider options={{key: 'css', prepend: true, enableCssLayer: true}}>
            <CssVarsProvider theme={theme}>
                {children}
            </CssVarsProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    )
}
