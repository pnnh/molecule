import {TocItem} from "@/models/article";
import {SteleBody} from "@/services/stele/core";
import {markdownToStele} from "@/services/stele/markdown";
import React from "react";
import {buildNodeView} from "@/services/stele/view";
import {NoteModel} from "@/models/personal/note";

export function NoteView({model}: { model: NoteModel }) {
    return <NoteContentView header={model.header} content={model.body}/>
}

export function NoteContentView({header, content}: { header: string, content: string }) {
    const tocList: TocItem[] = []
    if (!content) return <></>
    let bodyObject: SteleBody | null = null
    if (header === 'stele') {
        bodyObject = JSON.parse(content)
        if (!bodyObject) return <>无效文档格式</>
        if (!bodyObject.name) bodyObject.name = 'body'
    } else if (header === 'markdown') {
        bodyObject = markdownToStele(content)
    }
    if (!bodyObject) return <>无效文档格式</>
    const children = bodyObject.children
    if (!children || children.length < 1) return <></>

    return buildNodeView(tocList, bodyObject)
}
