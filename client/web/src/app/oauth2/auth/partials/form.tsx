'use client'


import {useState} from 'react'
import queryString from 'query-string'
import {ServerAuthParams} from '@/models/common/oauth2/auth'

export function FormEdit (props: { params: ServerAuthParams, scopes: string[], server: string }) {
  const searchParams = props.params
  const scopes = props.scopes
  const [errorMsg, setErrorMsg] = useState('')
  const [checked, setChecked] = useState<string[]>([])

  const isChecked = (item: string) => checked.includes(item)

  const ErrorElement = () => errorMsg ? <div>{errorMsg}</div> : <div></div>

  const query = queryString.stringify(searchParams)

  const postUrl = props.server + '/oauth2/auth?' + query

  return <form method={'POST'} action={postUrl} onSubmit={(event) => {
    if (checked.length < 1) {
      event.preventDefault()
      setErrorMsg('请至少选择一个授权范围')
    }
  }}>
        <div>
            {
                scopes.map((item, index) => (
                    <div key={index}>
                        <label>
                            <input value={item} type={'checkbox'} name={'scopes'} checked={isChecked(item)}
                                   onChange={(event) => {
                                     let updatedList = [...checked]
                                     if (event.target.checked) {
                                       updatedList = [...checked, event.target.value]
                                     } else {
                                       updatedList.splice(checked.indexOf(event.target.value), 1)
                                     }
                                     setChecked(updatedList)
                                     if (updatedList.length < 1) {
                                       setErrorMsg('请至少选择一个授权范围')
                                     } else {
                                       setErrorMsg('')
                                     }
                                   }}/>
                            <span>{item}</span>
                        </label>
                    </div>
                ))
            }
        </div>
        <div>
            <ErrorElement></ErrorElement>
        </div>
        <button className={'btn'} type={'submit'}>确认授权</button>
    </form>
}
