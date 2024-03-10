'use client'

import styles from './sidebar.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { DirectoryModel } from '@/models/personal/directory'
import { PLSelectResult } from '@/models/common-result'
import { directoryAtom, notebookAtom } from '@/app/console/providers/notebook'
import { selectNotebooks } from '@/services/personal/notebook'
import { NotebookModel } from '@/models/personal/notebook'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { DirectoryService } from '@/services/personal/directories'

export function DirectoryBar ({ profile }: {profile: string}) {

  return <div className={styles.sidebar}>
    <NotebookSelector profile={profile}></NotebookSelector>
    <div className={styles.directoryList}>
      <DirectoryList />
    </div>
  </div>
}

function NotebookSelector ({ profile }: {profile: string}) {
  const [notebooks, setNotebooks] = useState<PLSelectResult<NotebookModel>>()
  const [notebookDropdown, setNotebookDropdown] = useState<boolean>(false)
  const setNotebook = useSetRecoilState(notebookAtom)
  useEffect(() => {
    const loadData = async () => {
      const notebooks = await selectNotebooks('profile=' + profile)
      console.log('selectNotebooks', notebooks)
      setNotebooks(notebooks)
    }
    loadData()
  }, [profile])

  if (!notebooks || !notebooks.range || notebooks.range.length <= 0) {
    return <div>暂无笔记本</div>
  }
  const defaultNotebook = notebooks.range[0]
  setNotebook(defaultNotebook.pk)
  return <>
    <div className={styles.notebookSelector}>
      <div className={styles.notebookTitle}>
        <span>{defaultNotebook.title}</span>
        <Image src='/icons/console/down-arrow.png' alt='选择笔记本' width={24} height={24}
          onClick={()=>setNotebookDropdown(!notebookDropdown)}></Image>
      </div>
      <div className={styles.notebookAction}>
        <Image src='/icons/console/new-file-fill.png' alt='创建笔记' width={16} height={16}></Image>
        <Image src='/icons/console/new-folder-fill.png' alt='创建目录' width={16} height={16}></Image>
      </div>
    </div>
    {
      notebookDropdown && <div className={styles.notebookList}>
        {
          notebooks && notebooks.range && notebooks.range.map(item => {
            return <div key={item.pk} className={styles.notebookItem} onClick={() => {
                  setNotebookDropdown(!notebookDropdown)
                  setNotebook(item.pk)
                }}>
              <span className={styles.notebookName}>{item.title}</span>
            </div>
          })
        }
      </div>
    }
  </>
}
function DirectoryList () {

  const [directories, setDirectories] = useState<PLSelectResult<DirectoryModel>>()
  const notebook = useRecoilValue(notebookAtom)
  useEffect(() => {
    const loadData = async () => {
      if (notebook) {
        const service = new DirectoryService()
        const directories = await service.selectDirectorys('notebook=' + notebook)
        setDirectories(directories)
      }
    }
    loadData()
  }, [notebook])

  if (!directories || !directories.range || directories.range.length <= 0) {
    return <div>Empty</div>
  }
  return <div className={styles.directoryList}>
    {
      directories.range.map(item => {
        return <DirectoryCard key={item.pk} item={item} />
      })
    }
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
        {item.title}</div>
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
