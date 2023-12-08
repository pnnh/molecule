import styles from './toc.module.scss'
import { TocItem } from '@/models/article'

export function TocInfo (props: { channel: string, readurl: string, model: TocItem[] }) {
  return <div className={styles.tocCard}>
    <div className={styles.tocHeader}>
      目录信息
    </div>
    <div className={styles.tocBody}>
      {
        props.model && props.model.length > 0
          ? props.model.map((model, index) => {
            return <div key={`toc-${index}`} className={styles.tocItem}>
              <div className={'header-' + model.header}>
                <a href={props.readurl + '#' + model.id} title={model.title}>{model.title}</a>
              </div>
          </div>
          })
          : '暂无'
      }
    </div>
  </div>
}
