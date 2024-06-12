import {MDXRemote} from 'next-mdx-remote/rsc'
import {promises as fs} from 'fs';
import {PSSTextLink} from "@/components/link";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from 'remark-gfm'

const options = {
    mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
    }
}


export default async function RemoteMdxPage() {
    const file = await fs.readFile('/Users/Larry/Projects/github/blog/swift/swiftui代码片段.md', 'utf8');

    return <MDXRemote source={file} components={{PSSTextLink}} options={options}/>
}
