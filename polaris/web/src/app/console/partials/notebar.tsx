'use client'

import { nameAtom } from '../providers/theme'
import styles from './notebar.module.scss'
import { useRecoilValue } from 'recoil'

export function ConsoleNotebar () {
  const name = useRecoilValue(nameAtom)

  return <div className={styles.notebar}>Notebar {name}</div>
}
