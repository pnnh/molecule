import { Token, marked } from 'marked'
import { CodeBlockNode, HeadingNode, SteleBody, SteleNode } from './core'

export function tokenToNode (token: Token): SteleNode {
  let children: SteleNode[] | undefined
  const assertToken = token as {tokens:Token[]}
  if (typeof assertToken.tokens !== 'undefined' && Array.isArray(assertToken.tokens) &&
    assertToken.tokens.length > 0) {
    children = assertToken.tokens.map((t: Token) => tokenToNode(t))
  }

  let node: SteleNode
  switch (token.type) {
    case 'heading':
      node = {
        name: 'header',
        header: token.depth,
        text: 'text' in token ? token.text : '',
        raw: token.raw,
        children
      } as HeadingNode
      break
    case 'code':
      node = {
        name: 'code-block',
        language: token.lang,
        text: 'text' in token ? token.text : '',
        raw: token.raw,
        children
      } as CodeBlockNode
      break
    default:
      node = {
        name: token.type,
        text: 'text' in token ? token.text : '',
        raw: token.raw,
        children
      }
  }
  return node
}

export function markdownToStele (markdown: string) {
  const body: SteleBody = { name: 'body', children: [], text: '', raw: '' }
  const tokens = marked.lexer(markdown)
  body.children = tokens.map((t: Token) => tokenToNode(t))
  return body
}
