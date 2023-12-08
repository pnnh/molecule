'use client'

import React from 'react'
import { ArticleModel } from '@/models/article'
import styles from './view.module.scss'
import MarkdownIt from 'markdown-it'

export function MarkdownViewer (props: {model:ArticleModel}) {
  const model = props.model
  const markdown = new MarkdownIt()

  const createMarkup = () => {
    return {
      __html: markdown.render(model.body)
    }
  }

  return <div className={styles.editorForm}>
      <div>
        {model.title}
      </div>
      <div className={styles.editorRow}>
        <div className={styles.previewCol}>
              <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
      </div>
  </div>
}
