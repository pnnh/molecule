import React from 'react'
import { userRole } from '@/services/schema'
import { ArticlesChannelsPage } from '@/components/posts/channels'
import { PicturesChannelsPage } from '@/components/pictures/channels'

export default async function Page() {
    const entry = userRole()
    if (entry === 'portal') {
        return <div>Not Found</div>
    } else if (entry === 'venus') {
        return <PicturesChannelsPage />
    }

    return <ArticlesChannelsPage/>
}
