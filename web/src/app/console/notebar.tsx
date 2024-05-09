'use client'

import { useEffect, useState } from 'react'
import styles from './notebar.module.scss'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { PLSelectResult } from '@/models/common-result'
import { noteAtom, notebookAtom} from '@/app/console/providers/notebook'
import { NoteService } from '@/services/personal/notes'
import Image from 'next/image'
import { NoteModel } from '@/models/personal/note'

// export function PSNotesList(props: { result: PLSelectResult<NoteModel> }) {

//   const setNote = useSetRecoilState(noteAtom)
//   return <div className={styles.articleTable + ' table w-full'}>
//     {
//       props.result.range.map((item) => {
//         return <div key={item.uid} className={styles.articleRow} onClick={() => {
//           setNote(item.uid)
//         }}>
//           <div className={styles.articleTitle} title={item.title}>
//             {item.title}
//           </div>
//           <div className={styles.noteDesc}>
//             {STSubString(item.description, 60)}
//           </div>
//           <div className={styles.noteTime}>
//             {formatRfc3339(item.update_time)}
//           </div>
//         </div>
//       })
//     }
//   </div>
// }


// export function ConsoleNotebar () {
//   const directory = useRecoilValue(directoryAtom)
//   const [resources, setResources] = useState<PLSelectResult<NoteModel>>()

//   useEffect(() => {
//     const loadResources = async () => {
//       if (!directory) {
//         return
//       }
//       const queryString = `notebook=dotnet&directory=${directory}`
//       const response = await NoteService.selectNotes(queryString)
//       setResources(response)
//     }
//     loadResources()
//   }, [directory])

//   if (!resources) {
//     return <div>暂无笔记，请从左侧选择目录</div>
//   }

//   return <div className={styles.notebar}>
//     <div>
//       {
//         resources && <DirectoryList/>
//       }
//     </div>
//   </div>
// }

export function ConsoleNotebar() {

  const [directories, setDirectories] = useState<PLSelectResult<NoteModel>>()
  const notebook = useRecoilValue(notebookAtom)
  useEffect(() => {
    const loadData = async () => {
      if (!notebook || notebook === '') {
        return
      }
        const directories = await NoteService.selectNotes(notebook)
        setDirectories(directories)
      
    }
    loadData()
  }, [notebook])

  if (!directories || !directories.range || directories.range.length <= 0) {
    return <div>Empty</div>
  }
  return <div className={styles.noteList}>
    {
      directories.range.map(item => {
        return <NoteCard key={item.uid} item={item} />
      })
    }
  </div>
}

function NoteCard({ item }: { item: NoteModel }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const hasChildren = Boolean(item.children) && item.children > 0
  const setNote = useSetRecoilState(noteAtom)
  const [children, setChildren] = useState<PLSelectResult<NoteModel>>()

  const loadData = async () => {
    if (hasChildren) {
      const children = await NoteService.selectSubNotes(item.uid)
      setChildren(children)
    }
  }
  return <div className={styles.noteCard}>
    <div className={styles.noteSelf}> 
      <div className={styles.noteOpen} onClick={() => {
        setIsExpanded(!isExpanded)
        if (isExpanded) {
          setChildren(undefined)
        } else {
          loadData()
        }
      }
}>
        {
          hasChildren &&
          <Image src={isExpanded ? '/icons/console/triangle-down-fill.png' : '/icons/console/triangle-right-fill.png'}
              alt='目录' width={24} height={24} style={{width: '24px', height: '24px'}}></Image>
        }
      </div>
      <div className={styles.noteName} onClick={() => {
        console.debug('setLibrary', item.name)
        setNote(item.uid)
      }}>
        {item.title}</div>
    </div>
    <div className={styles.noteChildren} style={{ display: isExpanded ? 'block' : 'none' }}>
      {
        children && children.range.map(child => {
          return <NoteCard key={child.uid} item={child} />
        })
      }
    </div>
  </div>
}