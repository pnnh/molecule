import React from 'react'
import styles from './page.module.scss'
import { getIdentity } from '@/services/auth'
import { PublicNavbar } from './partials/navbar'

import { lerpServer } from '@/services/server/wasm-server'



export default async function Home({ searchParams }: {
    searchParams: Record<string, string>
}) {
    console.debug('searchParams:', searchParams)

    const a = lerpServer(1, 2, 0.5)
    console.debug('axxxx server:', a)
    const identity = await getIdentity()
    return <div className={styles.fullPage}>
        <div>
            {<PublicNavbar account={identity} />}
        </div>
        <div className={styles.mainContainer}>
            Home
        </div>
    </div>
}
