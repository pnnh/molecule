import Link from 'next/link'
import styles from './navbar.module.scss'
import {fullAuthUrl} from '@/services/common/const'
import Image from 'next/image'
import {AccountModel} from '@/models/account'

export function PublicNavbar(props: { account?: AccountModel }) {
    return <div className={styles.navHeader}>
        <div className={styles.leftNav}>
            <div>
                <Link className={styles.brandLink} href={'/'}>
                    <Image src='/images/logo.png' alt='logo' fill={true} sizes={'48px,48px'}/>
                </Link>
            </div>
            <Link className={styles.navLink} href={'/channels'}>频道</Link>
            <Link className={styles.navLink} href={'/posts'}>笔记</Link>
            {/* <Link className={styles.navLink} href={'/posts'}>图片</Link>
            <Link className={styles.navLink} href={'/posts'}>群组</Link> */}
            <Link className={styles.navLink} href={'/tools'}>工具</Link>
        </div>
        <div className={styles.rightNav}>
            <UserAction account={props.account}/>
        </div>
    </div>
}

function UserAction(props: { account?: AccountModel }) {
    if (!props.account) {
        const clientAuthUrl = fullAuthUrl('/')
        return <Link
            href={clientAuthUrl} rel='nofollow' className={styles.loginLink}>登录</Link>
    }
    return <div>
        <Link className={styles.loginLink} href={'/console'}>{props.account.nickname}</Link>
    </div>
}
