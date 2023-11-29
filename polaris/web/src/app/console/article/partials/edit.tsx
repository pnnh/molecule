'use client'

import React, { useState } from 'react'
import { ArticleModel } from '@/models/article'
import styles from './edit.module.scss'
import MarkdownIt from 'markdown-it'
import { TWButton, TWInput } from '@/components/client/controls'

export function MarkdownEditorForm (props: {model?:ArticleModel, onSubmit?: (model: ArticleModel) => void}) {
  const model = props.model ?? new ArticleModel()
  const onSubmit = props.onSubmit
  const [title, setTitle] = useState<string>(model.title)
  const [content, setContent] = useState<string>(model.body)
  const markdown = new MarkdownIt()

  const createMarkup = () => {
    return {
      __html: markdown.render(content)
    }
  }

  return <div className={styles.editorForm}>
      <div>
        <TWInput
          placeholder="文章标题"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
          }}
        />
      </div>
      <div className={styles.editorRow}>
        <div className={styles.textCol}>
          <textarea
            className={styles.textarea}
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
            } }
          ></textarea>
        </div>
        <div className={styles.previewCol}>
              <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
      </div>
      <div className={'mt-3'}>
        <TWButton onClick={async () => {
          if (!onSubmit) {
            return
          }
          const newModel = {
            ...model,
            title,
            body: content
          }
          onSubmit(newModel)
        }}>保存文章
        </TWButton>
      </div>
  </div>
}
