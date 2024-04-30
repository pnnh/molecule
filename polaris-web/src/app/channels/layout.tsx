import React from 'react'
import {ChannelsNavbar} from './navbar'
import styles from './layout.module.css'
import {getIdentity} from '@/services/auth'

export default async function ArticleLayout({
                                                children
                                            }: {
    children: React.ReactNode
}) {
    const identity = await getIdentity()

    return <div className={styles.container}>
        <div>
            <ChannelsNavbar account={identity}/>
        </div>
        <div className={styles.body}>
            {children}
        </div>
    </div>
}
