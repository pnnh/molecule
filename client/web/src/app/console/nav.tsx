import {PSSTextLink} from '@/components/link'
import Link from 'next/link'
import styles from './nav.module.scss'


export function ConsoleTopNav (props: { username: string }) {
  return <nav className={styles.navHeader}>
        <div className={styles.headerRow}>
            <div className={styles.headerMenu}>
                <div className={styles.headerLeft}>
                    <Link className={styles.navLink} href='/'>首页</Link>
                </div>
                <div className={styles.headerRight}>
                    {props.username}
                </div>
            </div>
        </div>
    </nav>
}


export function ConsoleLeftNav () {
  return <div className={styles.navContainer}>
        <div className={styles.navTitle}>控制台左侧导航</div>
        <div className={styles.navMenu}>
            <div className={styles.navItem}>
                <PSSTextLink href='/console/applications'>应用管理</PSSTextLink>
            </div>
            <div className={styles.navItem}>
                <PSSTextLink href='/console/users'>用户管理</PSSTextLink>
            </div>
            <div className={styles.navItem}>
                <PSSTextLink href='/console/roles'>角色管理</PSSTextLink>
            </div>
            <div className={styles.navItem}>
                <PSSTextLink href='/console/permissions'>权限管理</PSSTextLink>
            </div>
            <div className={styles.navItem}>
                <PSSTextLink href='/console/tags'>标签管理</PSSTextLink>
            </div>
        </div>
    </div>
}
