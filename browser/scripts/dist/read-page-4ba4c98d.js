import { r as react, R as ReactDOM, a as React } from './index.js';
import { getJsonData } from '@/utils/helpers';

const ArticleMenu = () => {
  const data = getJsonData();
  if (!data || !data.login) {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", {
      className: "fx-primary-button",
      onClick: () => {
        window.location.href = "/account/login";
      }
    }, "\u767B\u5F55"));
  }
  const children = [];
  const createButton = /* @__PURE__ */ React.createElement("button", {
    className: "fx-primary-button new-button",
    onClick: () => {
      window.location.href = "/article/new";
    }
  }, "\u521B\u4F5C");
  children.push(createButton);
  const elements = children.map((element, index) => /* @__PURE__ */ React.createElement("div", {
    key: index
  }, element));
  return /* @__PURE__ */ React.createElement("div", {
    className: "article-page-menu"
  }, elements);
};
function ReadPage() {
  react.exports.useEffect(() => {
    const rootElement = document.getElementById("user-menu");
    if (rootElement) {
      ReactDOM.render(/* @__PURE__ */ React.createElement(ArticleMenu, null), rootElement);
    }
  }, []);
  return /* @__PURE__ */ React.createElement("div", null);
}
var readPage = () => {
  const codes = document.getElementsByTagName("code");
  if (codes) {
    Array.from(codes).forEach((e) => {
      if (!(e instanceof HTMLElement)) {
        return;
      }
      const code = e.innerText;
      const language = e.className;
      if (language) {
        let html = code;
        if (Prism.languages[language]) {
          html = Prism.highlight(code, Prism.languages[language], language);
        }
        e.innerHTML = html;
      }
    });
  }
};

export { ReadPage, readPage as default };
