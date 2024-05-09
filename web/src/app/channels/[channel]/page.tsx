import React from 'react'
import { ArticlesPage } from '@/components/posts/post'
import { userRole } from '@/services/schema'
import { PicturesPage } from '@/components/pictures/picture'

export default async function Home({params, searchParams}: {
    params: { channel: string },
    searchParams: Record<string, string>
}) {
    const entry = userRole()
    if (entry === 'portal') {
        return <div>Not Found</div>
    } else if (entry === 'venus') {
        return <PicturesPage channel={params.channel} searchParams={searchParams}/>
    } 
    return <ArticlesPage channel={params.channel} searchParams={searchParams}/>
}