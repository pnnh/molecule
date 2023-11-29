'use client'

import styles from './sidebar.module.scss'
import Link from 'next/link'

export function ConsoleSidebar () {
  return <div className={styles.sidebar}>
    <div className={styles.productSelect}>
      集成平台
    </div>
    <div className={styles.navItem}>
      <Link href={'/'} className={'normalLink'}>控制台主页</Link>
    </div>
    <div className={styles.navItem}>
      <Link href={'/console/pipeline'} className={'normalLink'}>构建流水线</Link>
    </div>
    <div className={styles.navItem}>
      <Link href={'/console/repository'} className={'normalLink'}>构建配置</Link>
    </div>
    <div className={styles.navItem}>
      <Link href={'/console/artifact'} className={'normalLink'}>产物管理</Link>
    </div>
    <div className={styles.navItem}>
      <Link href={'/console/environment'} className={'normalLink'}>部署环境</Link>
    </div>
    <div className={styles.navItem}>
      <Link href={'/console/repository'} className={'normalLink'}>服务列表</Link>
    </div>
    <div className={styles.navItem}>
      <Link href={'/console/configfile'} className={'normalLink'}>部署配置</Link>
    </div>
  </div>
}
