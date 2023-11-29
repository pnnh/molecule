'use client'

import {AddButton} from './add'
import React from 'react'
import {Input} from 'antd'
import styles from './toolbar.module.scss'
import queryString from 'query-string'
import {useRouter} from '~/next/navigation'

const {Search} = Input

export function Toolbar (props: { rawQuery: string }) {
  const queryObject = queryString.parse(props.rawQuery, {arrayFormat: 'bracket'})

  const [text, setText] = React.useState<string>(queryObject.keyword as string)
  const router = useRouter()
  const onSearch = (value: string) => {
    queryObject.keyword = value
    const redirectUrl = '/console/repository?' + queryString.stringify(queryObject)
    console.log('redirectUrl', redirectUrl)
    router.push(redirectUrl)
  }
  return <div className={styles.toolbar}>
    <div className={styles.actionBar}>
      <AddButton/>
    </div>
    <div className={styles.searchBar}>
      {/*<Search value={text} placeholder="输入以搜索" onChange={(event) => {*/}
      {/*  setText(event.target.value)*/}
      {/*}} onSearch={onSearch} enterButton/>*/}
    </div>
  </div>
}
