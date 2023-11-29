'use client'

import {Breadcrumb} from '~/antd'
import React from 'react'

export function SiteNav () {
  return <Breadcrumb
    items={[
      {
        title: <a href="/console">控制台</a>,
      },
      {
        title: '构建流水线',
      },
    ]}
  />
}
