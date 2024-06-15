import Link from 'next/link'
import styles from './navbar.module.scss'
import {fullAuthUrl} from '@/services/common/const'
import Image from 'next/image'
import React from "react";
import {UserProfileSelector} from "@/app/partials/profile";
import {userRole} from "@/services/schema";
import {getPathname} from "@/services/server/pathname";
import {loadSessions} from "@/services/auth";

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
            <Image src={'/icons/materials/chevron_right_24dp_FILL0_wght400_GRAD0_opsz24.svg'}
                   className={'caret-blue-300'} alt={'chevron'}
                   height={24} width={24}>
            </Image>
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
    const sessionList = await loadSessions()
    const clientAuthUrl = fullAuthUrl('/')
    return <div>
        {
            sessionList.map((session) => {
                const linkUrl = `/content/${session.account.urn}/channels`
                return <Link key={session.account.uid} href={linkUrl}>{session.account.nickname}</Link>
            })
        }
        <Link
            href={clientAuthUrl} rel='nofollow' className={styles.loginLink}>登录</Link>
    </div>
}
