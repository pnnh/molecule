'use client'

import styles from './sidebar.module.scss'
import Image from 'next/image'
import { useEffect, useState } from 'react' 
import { PLSelectResult } from '@/models/common-result'
import { libraryAtom, notebookAtom } from '@/app/console/providers/notebook'
import { LibraryModel } from '@/models/personal/library'
import { useRecoilValue, useSetRecoilState } from 'recoil' 
import { sessionAtom } from './state/session'
import { LibraryService } from '@/services/personal/library'
import { NotebookService } from '@/services/personal/notebook'
import { NotebookModel } from '@/models/personal/notebook'

export function NotebookBar () {
  return <div className={styles.sidebar}>
    <LibrarySelector ></LibrarySelector>
    <div className={styles.directoryList}>
      <NotebookList />
    </div>
  </div>
}

function LibrarySelector () {
  const [notebooks, setLibrarys] = useState<PLSelectResult<LibraryModel>>()
  const [notebookDropdown, setLibraryDropdown] = useState<boolean>(false)
  const setLibrary = useSetRecoilState(libraryAtom)
  const session = useRecoilValue(sessionAtom)
  useEffect(() => {
    const loadData = async () => {
      if (!session || !session.account || !session.account.uid) {
        return
      }
      const notebooks = await LibraryService.selectLibraries(session.account.uid, '')
      console.log('selectLibrarys', notebooks)
      setLibrarys(notebooks)

      if (notebooks && notebooks.range && notebooks.range.length > 0) {
        setLibrary(notebooks.range[0].uid)
      } 
    }
    loadData()
  }, [session, setLibrary])

  if (!notebooks || !notebooks.range || notebooks.range.length <= 0) {
    return <div>暂无笔记本</div>
  }
  const defaultLibrary = notebooks.range[0] 
  return <>
    <div className={styles.notebookSelector}>
      <div className={styles.notebookTitle}>
        <span>{defaultLibrary.name}</span>
        <Image src='/icons/console/down-arrow.png' alt='选择笔记本' width={24} height={24}
          onClick={()=>setLibraryDropdown(!notebookDropdown)}></Image>
      </div>
      <div className={styles.notebookAction}>
        <Image src='/icons/console/new-file-fill.png' alt='创建笔记' width={16} height={16} style={{
          width: '16px', height: '16px'
        }}></Image>
        <Image src='/icons/console/new-folder-fill.png' alt='创建目录' width={16} height={16}></Image>
      </div>
    </div>
    {
      notebookDropdown && <div className={styles.notebookList}>
        {
          notebooks && notebooks.range && notebooks.range.map(item => {
            return <div key={item.uid} className={styles.notebookItem} onClick={() => {
                  setLibraryDropdown(!notebookDropdown)
                  setLibrary(item.uid)
                }}>
              <span className={styles.notebookName}>{item.name}</span>
            </div>
          })
        }
      </div>
    }
  </>
}
function NotebookList () {

  const [directories, setDirectories] = useState<PLSelectResult<NotebookModel>>()
  const library = useRecoilValue(libraryAtom)
  useEffect(() => {
    const loadData = async () => {
      if (library) { 
        const directories = await NotebookService.selectNotebooks(library)
        setDirectories(directories)
      }
    }
    loadData()
  }, [library])

  if (!directories || !directories.range || directories.range.length <= 0) {
    return <div>Empty</div>
  }
  return <div className={styles.directoryList}>
    {
      directories.range.map(item => {
        return <NotebookCard key={item.uid} item={item} />
      })
    }
  </div>
}

function NotebookCard ({ item }: {item: NotebookModel}) {
  const setNotebook = useSetRecoilState(notebookAtom)
  return <div className={styles.directoryCard}>
    <div className={styles.directorySelf}>
      <div className={styles.directoryName} onClick={() => {
        console.debug('setLibrary', item.name)
        setNotebook(item.uid)
      }}>
        {item.title}</div>
    </div>
</div>
}
