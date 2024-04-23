import React from 'react'
import {PicturesNavbar} from './navbar'
import styles from './layout.module.scss'
import {getIdentity} from '@/services/auth'

export default async function ArticleLayout({
                                                children
                                            }: {
    children: React.ReactNode
}) {
    const identity = await getIdentity()

    return <div className={styles.indexPage}>
        <div>
            <PicturesNavbar account={identity}/>
        </div>
        <div className={styles.container}>
            {children}
        </div>
    </div>
}
