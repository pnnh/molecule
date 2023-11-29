
import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import express from 'express';
import { HomePage } from './server/pages/home';
import html from "html";
import { createServer as createViteServer } from 'vite'
import renderServerPage from './entry-server';
// Create a new express application instance
const app: express.Application = express();

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'custom'
})
app.use(vite.middlewares)


const isProduction = process.env.NODE_ENV === 'production'

// app.get('/', (req, res) => {
//   let pageHtml = ReactDOMServer.renderToStaticMarkup(<HomePage />);
//   if (!isProduction) {
//     pageHtml = html.prettyPrint(pageHtml, { indent_size: 4 });
//   }
//   res.send(pageHtml);
// });
//app.use('/assets', express.static('assets'))


app.use('*', async (req, res, next) => {
  const url = req.originalUrl

  try {
    let template = "<html><header></header><body><div id='app'><!--ssr-outlet--></div></body></html>"

    template = await vite.transformIndexHtml(url, template)

    //const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

    const appHtml = await renderServerPage(url)

    const html = template.replace(`<!--ssr-outlet-->`, appHtml)

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e: any) {
    vite.ssrFixStacktrace(e)
    next(e)
  }
})



app.listen(8300, () => {
  console.log('Example app listening on port 8300!');
});
