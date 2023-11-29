import styles from './channel.module.scss'
import { ChannelModel } from '@/models/channel'

export function ChannelInfo (props: {model: ChannelModel | undefined}) {
  const channelTitle = props.model ? props.model.title : '所有'
  const channelDescription = props.model ? props.model.description : ''
  return <div className={styles.channelCard}>
    <div className={styles.channelHeader}>
      频道信息
    </div>
    <div className={styles.channelBody}>
      <div className={styles.channelTitle}>
        {channelTitle}
      </div>
      {channelDescription
        ? <div className={styles.channelDescription}>
        {channelDescription}
      </div>
        : null}
    </div>
  </div>
}
