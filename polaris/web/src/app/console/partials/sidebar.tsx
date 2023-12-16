'use client'

import Link from 'next/link'
import styles from './sidebar.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DirectoryService } from '@/services/personal/directories'
import { DirectoryModel } from '@/models/personal/directory'
import { PLSelectResult } from '@/models/common-result'

export function ConsoleSidebar () {
  const [directories, setDirectories] = useState<PLSelectResult<DirectoryModel>>()
  useEffect(() => {
    const service = new DirectoryService()
    service.selectDirectorys('notebook=dotnet').then(response => {
      console.log('selectDirectorys', response)
      setDirectories(response)
    })
  }, [])

  if (!directories) {
    return <div>Loading</div>
  }
  return <div className={styles.sidebar}>
    <div className={styles.notebookSelector}>
      <div className={styles.notebookTitle}>
        <span>默认笔记本</span>
        <Image src='/icons/console/down-arrow.png' alt='选择笔记本' width={24} height={24}></Image>
      </div>
      <div className={styles.notebookAction}>
        <Image src='/icons/console/new-file-fill.png' alt='创建笔记' width={16} height={16}></Image>
        <Image src='/icons/console/new-folder-fill.png' alt='创建目录' width={16} height={16}></Image>
      </div>
    </div>
    <div className={styles.directoryList}>
    {
      directories.range && directories.range.length > 0 && directories.range.map(item => {
        return <DirectoryCard key={item.pk} item={item} />
      })
    }
    </div>
{/*
    <div className={styles.sidebarItem}>
      <Link
        href="/console/notes"
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
    </div> */}
  </div>
}

function DirectoryCard ({ item }: {item: DirectoryModel}) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const hasChildren = item.children && item.children.length > 0
  // const isExpanded = true
  // const setIsExpanded = (value: boolean) => {}
  return <div className={styles.directoryCard} style={{ marginLeft: item.level * 4 + 'px' }}>
    <div className={styles.directorySelf}>
      <div className={styles.directoryOpen} onClick={() => setIsExpanded(!isExpanded)}>
        {
          hasChildren &&
          <Image src={isExpanded ? '/icons/console/triangle-down-fill.png' : '/icons/console/triangle-right-fill.png'} alt='目录' width={16} height={16}></Image>
        }

      </div>
      <Link
        href="/console"
      >{item.name}</Link>
    </div>
    <div className={styles.directoryChildren} style={{ display: isExpanded ? 'block' : 'none' }}>
      {
        hasChildren && item.children.map(child => {
          return <DirectoryCard key={child.pk} item={child} />
        })
      }
    </div>
</div>
}
