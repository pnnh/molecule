'use client'

import styles from './sidebar.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DirectoryService } from '@/services/personal/directories'
import { DirectoryModel } from '@/models/personal/directory'
import { PLSelectResult } from '@/models/common-result'
import { directoryAtom } from '../providers/notebook'
import { useSetRecoilState } from 'recoil'

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
  </div>
}

function DirectoryCard ({ item }: {item: DirectoryModel}) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const hasChildren = item.children && item.children.length > 0
  const setDirectory = useSetRecoilState(directoryAtom)
  return <div className={styles.directoryCard}>
    <div className={styles.directorySelf}>
      <div style={{ width: item.level * 8 + 'px' }}></div>
      <div className={styles.directoryOpen} onClick={() => setIsExpanded(!isExpanded)}>
        {
          hasChildren &&
          <Image src={isExpanded ? '/icons/console/triangle-down-fill.png' : '/icons/console/triangle-right-fill.png'} alt='目录' width={16} height={16}></Image>
        }
      </div>
      <div className={styles.directoryName} onClick={() => {
        console.debug('setNotebook', item.name)
        setDirectory(item.pk)
      }}>
        {item.name}</div>
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
