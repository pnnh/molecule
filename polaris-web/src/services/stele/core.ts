export interface SteleNode {
  name: string;
  text: string;
  raw: string;
  children?: SteleNode[];
}
export interface HeadingNode extends SteleNode {
  header: number;
}
export interface ParagraphNode extends SteleNode {
}
export interface CodeBlockNode extends SteleNode {
  language: string;
}

export interface SteleBody extends SteleNode {
}

export function buildText (node: SteleNode) {
  const text = node.text as string
  return text
}
