import React from 'react'
import { ArticlesPage } from '@/components/posts/post'

export default async function Home({params, searchParams}: {
    params: { channel: string },
    searchParams: Record<string, string>
}) {
    return <ArticlesPage channel={params.channel} searchParams={searchParams}/>
}
