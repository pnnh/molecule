export interface HeadingNode {
    name: string
    header: number
    children: TextNode[]
}

export interface TextNode {
    name: string
    text: string
}

export interface ParagraphNode {
    name: string
    children: TextNode[]
}

export interface CodeBlockNode {
    name: string
    language: string
    children: TextNode[]
}

export type SteleNode = HeadingNode | ParagraphNode | CodeBlockNode;

export interface SteleBody {
    name: string
    children: SteleNode[]
}
