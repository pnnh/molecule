'use client'

import {AddButton} from './add'
import React from 'react'
import {Input} from 'antd'
import styles from './toolbar.module.scss' 

const {Search} = Input

export function Toolbar () {

  const [text, setText] = React.useState<string>('') 
  return <div className={styles.toolbar}>
    <div className={styles.actionBar}>
      <AddButton/>
    </div>
    <div className={styles.searchBar}>
      <Search value={text} placeholder="输入以搜索" onChange={(event) => {
        setText(event.target.value)
      }} enterButton/>
    </div>
  </div>
}
