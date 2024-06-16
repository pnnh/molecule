import React from "react";
import styles from './profile.module.css'
import Link from "next/link";

export function UserProfileSelector({role}: { role: string }) {
    return <div className={styles.roleButtonContainer}>
        <Link className={styles.siteLink} href={'/polaris/channels'}>文章</Link>
        <Link className={styles.siteLink} href={'/polaris/channels'}>图片</Link>
        <Link className={styles.siteLink} href={'/polaris/channels'}>工具</Link>
    </div>
}
