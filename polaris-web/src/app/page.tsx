import React from 'react'
import { schemaPortal } from '@/services/schema'
import { ToolBody } from './tools/tool'
import { PostsBody } from './posts/post'
import { PicturesBody } from './pictures/picture'

export default async function Home({searchParams}: {
    searchParams: Record<string, string>
}) {
    const schema = schemaPortal()

    console.log('schema', schema)
    if (schema === 'portal') {
        return <ToolBody/>
    } else if (schema === 'venus') {
        return <PicturesBody searchParams={searchParams}/>
    }

    return <PostsBody searchParams={searchParams}/>
}
