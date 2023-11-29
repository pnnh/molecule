import { TocItem } from '@/models/article'
import styles from './view.module.scss'
import { generatorRandomString } from '~/@pnnh/stele/esm/utils/string'
import { CodeBlockNode, HeadingNode, ParagraphNode, SteleNode } from './core'

export function buildNodeView (tocList: Array<TocItem>, node: SteleNode) {
  if (!node) return <></>

  switch (node.name) {
    case 'header':
      return buildHeader(tocList, node as HeadingNode)
    case 'code-block':
      return buildCodeBlock(tocList, node as CodeBlockNode)
    case 'link':
      return buildLink(tocList, node)
    case 'paragraph':
      return buildParagraph(tocList, node)
    case 'body':
      return buildBodyView(tocList, node)
    case 'em':
    case 'strong':
    case 'del':
      return buildStyleText(tocList, node, {
        strong: node.name === 'strong',
        italic: node.name === 'em',
        underline: false,
        strikethrough: node.name === 'del'
      })
    default:
      return buildTextView(tocList, node)
  }
}

function buildBodyView (tocList: Array<TocItem>, node: SteleNode) {
  return <div className={styles.bodyHtml}>

  {node.children && node.children.length > 0
    ? node.children.map((child, index) => {
      return <div key={`node-${index}`}>{buildNodeView(tocList, child)}</div>
    })
    : <></>
}

    </div>
}

function buildParagraph (tocList: Array<TocItem>, node: ParagraphNode) {
  if (!node) return <p></p>
  const children = node.children
  if (!children || children.length < 1) return <p></p>

  return <p className={styles.paragraph}>
    {children.map((child, index) => {
      return <span key={`paragraph-${index}`}>{buildNodeView(tocList, child)}</span>
    })}
  </p>
}

function buildLink (tocList: Array<TocItem>, node: SteleNode) {
  return <a className={styles.link} href={node.text}>{node.text}</a>
}

function buildStyleText (tocList: Array<TocItem>, node: SteleNode, { strong, italic, underline, strikethrough }: {
    strong: boolean | undefined,
    italic: boolean | undefined,
    underline: boolean | undefined,
    strikethrough: boolean | undefined
}) {
  let className = ''
  if (strong) {
    className += ' ' + styles.strong
  }
  if (italic) {
    className += ' ' + styles.italic
  }
  if (underline) {
    className += ' ' + styles.underline
  }
  if (strikethrough) {
    className += ' ' + styles.strikethrough
  }
  return <span className={className}>{node.text}</span>
}

function buildTextView (tocList: Array<TocItem>, node: SteleNode) {
  return <span>{node.text}</span>
}

function buildHeader (tocList: Array<TocItem>, node: HeadingNode) {
  const header = node.header as number
  const children = node.children
  if (!children || children.length < 1) return <></>
  const headerTitle = node.text
  const randId = generatorRandomString(8)
  tocList.push({ title: headerTitle, header, id: randId })

  switch (header) {
    case 1:
      return <h1 id={randId} className={styles.headerOne}>{headerTitle}</h1>
    case 2:
      return <h2 id={randId} className={styles.headerTwo}>{headerTitle}</h2>
    case 3:
      return <h3 id={randId} className={styles.headerThree}>{headerTitle}</h3>
    case 4:
      return <h4 id={randId} className={styles.headerFour}>{headerTitle}</h4>
    case 5:
      return <h5 id={randId} className={styles.headerFive}>{headerTitle}</h5>
    case 6:
      return <h6 id={randId} className={styles.headerSix}>{headerTitle}</h6>
  }
  return <></>
}

export function buildCodeBlock (tocList: Array<TocItem>, node: CodeBlockNode) {
  let language = node.language
  let codeText = node.text
  if (!language) {
    language = 'text'
  }
  if (!codeText && node.children) {
    codeText = node.children.map((child) => {
      return child.text
    }).join()
  }

  return <code className={styles.codeblock}><polaris-codeblock language={language}>
      {codeText}
  </polaris-codeblock> </code>
}
