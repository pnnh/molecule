'use client'

import {AddButton} from './add'
import React from 'react'
import {Input} from 'antd'
import styles from './toolbar.module.scss'
import queryString from 'query-string'
import {useRouter} from '~/next/navigation'
import {ConfigFileSearchModel} from '@/models/configfile'

const {Search} = Input

export function Toolbar (props: { rawQuery: string }) {
  const queryObject = ConfigFileSearchModel.fromDto(queryString.parse(props.rawQuery, {arrayFormat: 'bracket'}))
  console.debug('queryObject', queryObject)
  const searchParams = queryObject

  const [text, setText] = React.useState<string>(searchParams.keyword ?? '')
  const router = useRouter()
  const onSearch = (value: string) => {
    searchParams.keyword = value
    const redirectUrl = '/console/configfile?' + queryString.stringify(searchParams)
    console.log('redirectUrl', redirectUrl)
    router.push(redirectUrl)
  }
  return <div className={styles.toolbar}>
    <div className={styles.actionBar}>
      <AddButton/>
    </div>
    <div className={styles.searchBar}>
      <Search value={text} placeholder="输入以搜索" onChange={(event) => {
        setText(event.target.value)
      }} onSearch={onSearch} enterButton/>
    </div>
  </div>
}
