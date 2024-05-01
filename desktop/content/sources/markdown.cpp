#include "content/sources/markdown.h"
#include "cmark.h"

MarkdownModel::MarkdownModel(QObject *parent)
{
}

MarkdownModel::~MarkdownModel()
{
}

Q_INVOKABLE QString MarkdownModel::markdownToHtml(QString markdownText) {

  // markdownText = "一段示例Markdown\n\n### 标题三\n标题三正文";
  // const char *md = markdownText.toStdString().c_str();

  // std::string demoText = "一段示例Markdown\n\n### 标题三\n标题三正文";
  // const char* md = demoText.c_str();

  //const char *md = "Markdown\n\n### Heading 3\n\nHeading 3 text";
  //const char *md = "Markdown一段示例\n\n### Heading 3标题三\n\nHeading 3 标题三 text";
  auto data = markdownText.toUtf8();
  const char *md = data.constData();
  auto length = strlen(md);
  char *html = cmark_markdown_to_html(md, length, CMARK_OPT_DEFAULT);
  QString htmlText = QString::fromUtf8(html);
  free(html);
  return htmlText + "\nconverted to HTML";
}
