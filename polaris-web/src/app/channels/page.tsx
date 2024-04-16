import React from 'react'
import styles from './page.module.scss'
import Link from 'next/link'
import { PSCard } from '@/components/client/controls'
import { ChannelModel } from '@/models/channel'
import { PSImage } from '@/components/client/image'
import { serverConfig } from '@/services/server/config'
import { ChannelService } from '@/services/channel'

function Item (props: { model: ChannelModel }) {
  const readUrl = `/channels/${props.model.urn}`
  return <PSCard className={styles.item}>
    <div className={styles.itemCover}>
      <PSImage src={props.model.image} alt='star' width={256} height={256}/>
    </div>
    <div className={styles.content}>
      <div className={styles.title}>
        <Link className={styles.link} href={readUrl}>{props.model.name}</Link>
      </div>
      <div className={styles.description}>
        {props.model.description}
      </div>
    </div>
  </PSCard>
}

export default async function Home () {
  const pageSize = 64
  const service = ChannelService.Instance(serverConfig.NEXT_PUBLIC_SERVER)
  const result = await service.selectChannels(`page=1&size=${pageSize}`)
  return <div className={styles.container}>
    <div className={styles.body}>
      <div className={styles.list}>
        {result.range.map((model) => {
          return <Item key={model.uid} model={model}/>
        })
        }
      </div>
    </div>
  </div>
}
