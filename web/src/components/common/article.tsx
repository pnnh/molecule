import styles from './article.module.scss'
import {RenderCodeBlock} from '../client/codeblock'
import {SteleBody} from '@/services/stele/core'
import {markdownToStele} from '@/services/stele/markdown'
import {buildNodeView} from '@/services/stele/view'
import {TocItem} from "@/models/common/article";

export function BuildBodyHtml(props: { tocList: Array<TocItem>, header: string, body: unknown }) {
    if (!props.body) return <></>
    let bodyObject: SteleBody | null = null
    if (props.header === 'stele' && typeof props.body === 'string') {
        bodyObject = JSON.parse(props.body)
        if (!bodyObject) return <>无效文档格式</>
        if (!bodyObject.name) bodyObject.name = 'body'
    } else if (props.header === 'markdown' && typeof props.body === 'string') {
        bodyObject = markdownToStele(props.body)
    }
    if (!bodyObject) return <>无效文档格式</>
    const children = bodyObject.children
    if (!children || children.length < 1) return <></>

    return <div className={styles.articleBodyHtml}>
        {buildNodeView(props.tocList, bodyObject)}
        <RenderCodeBlock/>
    </div>
}
