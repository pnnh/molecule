'use client'

import Link from 'next/link'
import styles from './sidebar.module.scss'

export function ConsoleSidebar () {
  return <div className={styles.sidebar}>
    <div className={styles.sidebarItem}>
      <Link
        href="/console"
      >
                        控制台
      </Link>
    </div>
    <div className={styles.sidebarItem}>
      <Link
        href="/console/article"
      >
                        文章管理
      </Link>
    </div>
    <div className={styles.sidebarItem}>
      <Link
        href="/console/categories"
      >
                        分类管理
      </Link>
    </div>
    <div className={styles.sidebarItem}>
      <Link
        href="/console/groups"
      >
                        分组管理
      </Link>
    </div>
    <div className={styles.sidebarItem}>
      <Link
        href="/console/channel"
      >
                        频道管理
      </Link>
    </div>
    <div className={styles.sidebarItem}>
      <Link
        href="/console/comments"
      >
                        评论管理
      </Link>
    </div>
    <div className={styles.sidebarItem}>
      <Link
        href="/console/tags">
                        标签管理
      </Link>
    </div>
  </div>
}
