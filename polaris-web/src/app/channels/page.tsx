import React from 'react'
import { userRole } from '@/services/schema'
import { ArticlesChannelsPage } from '@/components/posts/channels'

export default async function Page() {
    const entry = userRole()
    if (entry === 'portal') {
        return <div>Not Found</div>
    } else if (entry === 'venus') {
        //return <PicturesBody searchParams={searchParams}/>
        return <div>Not Found2</div>
    }

    return <ArticlesChannelsPage/>
}
