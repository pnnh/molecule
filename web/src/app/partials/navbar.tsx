import Link from 'next/link'
import styles from './navbar.module.scss'
import {fullAuthUrl} from '@/services/common/const'
import Image from 'next/image'
import React from "react";
import {UserProfileSelector} from "@/app/partials/profile";
import {loadSessions2} from "@/services/auth";
import {stringToBase58} from "@/utils/basex";
import {PSImage} from "@/components/client/image";
import {SessionModel} from "@/models/session";

export async function PublicNavbar({viewer}: { viewer: string }) {
    const sessionList = await loadSessions2()
    if (!viewer && sessionList.length > 0) {
        const firstSession = sessionList[0]
        viewer = stringToBase58(`${firstSession.name}@${firstSession.domain}`)
    }
    if (!viewer) {
        throw new Error('No viewer')
    }
    return <div className={styles.navHeader}>
        <div className={styles.leftNav}>
            <div>
                <Link className={styles.brandLink} href={'/'}>
                    <Image src='/images/logo.png' alt='logo' fill={true} sizes={'48px,48px'}/>
                </Link>
            </div>
            <UserProfileSelector viewer={viewer}/>
        </div>
        <div className={styles.rightNav}>
            <UserAction sessionList={sessionList}/>
        </div>
    </div>
}


async function UserAction({sessionList}: { sessionList: SessionModel[] }) {
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
