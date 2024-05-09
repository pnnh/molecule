import React from 'react'
import { PicturesPage } from '@/components/pictures/picture'

export default async function Home({params, searchParams}: {
    params: { channel: string },
    searchParams: Record<string, string>
}) {
    return <PicturesPage channel={params.channel} searchParams={searchParams}/>
}
