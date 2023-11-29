'use client'

import {AddButton} from './add'
import React from 'react'
import {Input} from 'antd'
import styles from './toolbar.module.scss'
import queryString from 'query-string'
import {useRouter} from '~/next/navigation'
import {AdvancedSearchPopover} from './search'
import {ArtifactSearchModel} from '@/models/artifact'

const {Search} = Input

export function Toolbar (props: { rawQuery: string }) {
  const queryObject = ArtifactSearchModel.fromDto(queryString.parse(props.rawQuery, {arrayFormat: 'bracket'}))
  console.debug('queryObject2', queryObject)
  const searchParams = queryObject

  const [text, setText] = React.useState<string>('')
  const router = useRouter()
  const onSearch = (value: string) => {
    const redirectUrl = '/console/artifact?' + queryString.stringify(searchParams)
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
      <AdvancedSearchPopover searchParams={searchParams}/>
    </div>
  </div>
}
