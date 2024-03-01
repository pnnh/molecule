import React from "react";
import * as ReactDOMServer from 'react-dom/server';
import { HomeServerPage } from './server/pages/home-server';
import html from "html";

const isProduction = process.env.NODE_ENV === 'production'

export default function renderServerPage(url: string) {

  console.log('rendering', url)

  let pageHtml = ""
  if (url === "/") {

    pageHtml = ReactDOMServer.renderToStaticMarkup(<HomeServerPage />);
  } else {
    pageHtml = ReactDOMServer.renderToStaticMarkup(<HomeServerPage />);
  }

  if (!isProduction) {
    pageHtml = html.prettyPrint(pageHtml, { indent_size: 4 });
  }


  return pageHtml
}


