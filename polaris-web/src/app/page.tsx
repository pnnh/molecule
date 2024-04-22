import React from 'react'
import { schemaPortal } from '@/services/schema'
import { ToolBody } from './tools/tool'
import { PostsBody } from './posts/post'

export default async function Home({searchParams}: {
    searchParams: Record<string, string>
}) {
    const schema = schemaPortal()

    console.log('schema', schema)
    if (schema) {
        return <ToolBody/>
    }

    return <PostsBody searchParams={searchParams}/>
}
