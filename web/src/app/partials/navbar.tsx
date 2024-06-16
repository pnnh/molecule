import Link from 'next/link'
import styles from './navbar.module.scss'
import {fullAuthUrl} from '@/services/common/const'
import Image from 'next/image'
import React from "react";
import {UserProfileSelector} from "@/app/partials/profile";
import {userRole} from "@/services/schema";
import {getPathname} from "@/services/server/pathname";
import {loadSessions2} from "@/services/auth";
import {stringToBase58} from "@/utils/basex";
import {PSImage} from "@/components/client/image";

export async function PublicNavbar() {
    const entry = userRole()
    const pathname = getPathname()
    return <div className={styles.navHeader}>
        <div className={styles.leftNav}>
            <div>
                <Link className={styles.brandLink} href={'/'}>
                    <Image src='/images/logo.png' alt='logo' fill={true} sizes={'48px,48px'}/>
                </Link>
            </div>
            <UserProfileSelector role={entry}/>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#C6C6C6">
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
            </svg>
            <RoleNavbar role={entry} pathname={pathname}/>
        </div>
        <div className={styles.rightNav}>
            <UserAction/>
        </div>
    </div>
}

function RoleNavbar({role, pathname}: { role: string, pathname: string }) {
    if (pathname.startsWith('/portal') || role === 'portal') {
        return <></>
    } else if (pathname.startsWith('/venus') || role === 'venus') {
        return <Link className={styles.navLink} href={'/venus/channels'}>图片频道</Link>
    }
    return <Link className={styles.navLink} href={'/polaris/channels'}>文章频道</Link>
}

async function UserAction() {
    const sessionList = await loadSessions2()
    const clientAuthUrl = fullAuthUrl('/')
    return <>
        {
            sessionList.map((session) => {
                const viewerString = `${session.name}@${session.domain}`
                const linkUrl = `/content/${stringToBase58(viewerString)}/channels`
                return <Link className={styles.loginLink} key={session.account.uid} href={linkUrl}>
                    <PSImage src={session.account.image} alt={session.account.nickname} height={32} width={32}/>
                </Link>
            })
        }
        <Link
            href={clientAuthUrl} rel='nofollow' className={styles.plusLink}>
            <Image src='/icons/navbar/plus.svg' alt='login' height={32} width={32}/>
        </Link>
    </>
}
