'use client'

import React from 'react'
import styles from './toolbar.module.scss'

export function Toolbar () {
  return <div className={styles.toolbar}>
    <div></div>
    <div>

      {/* <Dropdown
        label="新评论"
        dismissOnClick={false}
        placement={'bottom-end'}

      >
        <Dropdown.Item
          onClick={() => {
            router.replace('/console/comments/new')
          }}>
                    New
        </Dropdown.Item>
      </Dropdown> */}
    </div>
  </div>
}
