import React from "react";
import styles from './profile.module.css'
import Link from "next/link";
import {userRole} from "@/services/schema";
import {getPathname} from "@/services/server/pathname";

export function UserProfileSelector({viewer}: { viewer: string }) {
    const entry = userRole()
    const pathname = getPathname()
    return <>
        <div className={styles.roleButtonContainer}>
            <Link className={styles.siteLink} href={`/content/${viewer}/channels`}>文章</Link>
            <Link className={styles.siteLink} href={`/content/${viewer}/pictures/channels`}>图片</Link>
            <Link className={styles.siteLink} href={'/polaris/channels'}>工具</Link>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#C6C6C6">
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
        </svg>
        <RoleNavbar role={entry} pathname={pathname}/>
    </>
}

function RoleNavbar({role, pathname}: { role: string, pathname: string }) {
    if (pathname.startsWith('/portal') || role === 'portal') {
        return <></>
    } else if (pathname.startsWith('/venus') || role === 'venus') {
        return <Link className={styles.navLink} href={'/venus/channels'}>频道</Link>
    }
    return <Link className={styles.navLink} href={'/polaris/channels'}>文章频道</Link>
}