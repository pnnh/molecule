import React from 'react'
import styles from './layout.module.scss'
import {ConsoleNavbar} from './partials/navbar'
import {ConsoleFeature} from './partials/feature'
import { RecoilProvider } from './state/provider'
 
export default function ConsoleLayout({
                                          children
                                      }: {
    children: React.ReactNode
}) {
    return (
        <RecoilProvider>
            <div className={styles.consolePage}>
                <div className={styles.navbar}>
                    <ConsoleNavbar></ConsoleNavbar>
                </div>
                <div className={styles.mainContainer}>
                    <div className={styles.leftNav}>
                        <ConsoleFeature/>
                    </div>
                    <div className={styles.rightBody}>
                        {children}
                    </div>
                </div>
            </div>
        </RecoilProvider>
    )
}
