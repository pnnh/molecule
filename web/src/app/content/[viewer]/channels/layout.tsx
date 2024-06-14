import React from 'react'
import styles from './layout.module.css'
import {getIdentity} from '@/services/auth'
import {PublicNavbar} from "@/app/partials/navbar";
import {getPathname} from "@/services/server/pathname";

export default async function ArticleLayout({
                                                children
                                            }: {
    children: React.ReactNode
}) {
    const identity = await getIdentity()

    return <div className={styles.container}>
        <div>
            <PublicNavbar account={identity.account} pathname={getPathname()}/>
        </div>
        <div className={styles.body}>
            {children}
        </div>
    </div>
}
