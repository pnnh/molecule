import React from 'react'
import styles from './page.module.scss'
import { getIdentity } from '@/services/auth'
import { PublicNavbar } from './partials/navbar'
import Image from 'next/image'

import { lerpServer } from '@/services/server/wasm-server'
import {headers} from "~/next/headers";

export default async function Home({ searchParams }: {
    searchParams: Record<string, string>
}) {
    console.debug('searchParams:', searchParams)

    const a = lerpServer(1, 2, 0.5)
    console.debug('axxxx server:', a)
    const headersList = headers();
    const fullUrl = headersList.get('referer') || "";
    const url = new URL(fullUrl)
    const identity = await getIdentity()
    return <div className={styles.fullPage}>
        <div>
            <PublicNavbar account={identity} pathname={url.pathname} />
        </div>
        <div className={styles.mainContainer}>
            <div className={styles.contentCenter}>
                <Image src={'/images/bear.jpg'} width={888} height={888} alt='lighthouse' />
            </div>
        </div>
    </div>
}
