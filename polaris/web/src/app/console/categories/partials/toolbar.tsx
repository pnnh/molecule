'use client'

import React from 'react'
import styles from './toolbar.module.scss'

export function Toolbar () {
  // const router = useRouter()
  return <div className={styles.toolbar}>
    <div></div>
    <div>

      {/* <Dropdown
        label="创建分类"
        dismissOnClick={false}
        placement={'bottom-end'}

      >
        <Dropdown.Item
          onClick={() => {
            router.replace('/console/categories/new')
          }}>
                    New
        </Dropdown.Item>
      </Dropdown> */}
    </div>
  </div>
}
