import React from 'react'
import styles from './layout.module.css'
import {getIdentity} from '@/services/auth'
import {PublicNavbar} from "@/app/partials/navbar";

export default async function ArticleLayout({
                                                children
                                            }: {
    children: React.ReactNode
}) {
    const identity = await getIdentity()

    return <div className={styles.container}>
        <div>
            <PublicNavbar account={identity} />
        </div>
        <div className={styles.body}>
            {children}
        </div>
    </div>
}
