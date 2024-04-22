import Link from 'next/link'
import styles from './navbar.module.scss'
import Image from 'next/image'

export function ToolNavbar() {
    return <div className={styles.navHeader}>
        <div className={styles.leftNav}>
            <div>
                <Link className={styles.brandLink} href={'/'}>
                    <Image src='/images/logo.png' alt='logo' fill={true} sizes={'48px,48px'}/>
                </Link>
            </div>
            <Link className={styles.navLink} href={'/tools'}>工具</Link>
        </div>
        <div className={styles.rightNav}>
        </div>
    </div>
}