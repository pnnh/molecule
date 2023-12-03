import React from 'react'
import styles from './page.module.scss'
import Link from 'next/link'
import { PSCard } from '@/components/client/controls'
import { ChannelModel } from '@/models/channel'
import { PSImage } from '@/components/client/image'
import { loadServerConfig } from '@/services/server/config'
import { ChannelService, channelPageUrl } from '@/services/channel'

function Item (props: { model: ChannelModel }) {
  const readUrl = channelPageUrl(props.model.pk)
  return <PSCard className={styles.item}>
    <div className={styles.itemCover}>
      <PSImage src={props.model.image} alt='star' width={256} height={256}/>
    </div>
    <div className={styles.content}>
      <div className={styles.title}>
        <Link className={styles.link} href={readUrl}>{props.model.title}</Link>
      </div>
      <div className={styles.description}>
        {props.model.description}
      </div>
      <div className={styles.actions}>
        <Link href={readUrl} className={styles.readButton}>查看文章</Link>
      </div>
    </div>
  </PSCard>
}

export default async function Home () {
  const pageSize = 64
  const serverConfig = await loadServerConfig()
  const service = ChannelService.Instance(serverConfig.SERVER)
  const result = await service.selectChannels(`page=1&size=${pageSize}`)
  return <div className={styles.indexPage}>
    <div className={styles.container}>
      <div className={styles.list}>
        {result.range.map((model) => {
          return <Item key={model.pk} model={model}/>
        })
        }
      </div>
    </div>
  </div>
}
