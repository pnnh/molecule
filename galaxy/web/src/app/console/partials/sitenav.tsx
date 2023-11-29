'use client'

import {Breadcrumb} from '~/antd'
import React from 'react'

export function SiteNav () {
  return <Breadcrumb
    items={[
      {
        title: '控制台',
      },
      {
        title: <a href="">测试计划</a>,
      },
      {
        title: <a href="">执行结果</a>,
      },
      {
        title: '列表',
      },
    ]}
  />
}
