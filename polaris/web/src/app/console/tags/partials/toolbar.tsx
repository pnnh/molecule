'use client'

import React from 'react'
import styles from './toolbar.module.scss'

export function Toolbar () {
  return <div className={styles.toolbar}>
    <div></div>
    <div>
{/*
      <Dropdown
        label="创建标签"
        dismissOnClick={false}
        placement={'bottom-end'}

      >
        <Dropdown.Item
          onClick={() => {
            router.replace('/console/tags/new')
          }}>
                    New
        </Dropdown.Item>
      </Dropdown> */}
    </div>
  </div>
}
