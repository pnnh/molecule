import Image from 'next/image'
import {genBasicToken} from '@/models/session'
import {getIdentity} from '@/services/auth'
import {formatRfc3339} from '@/utils/datetime'
import {ApplicationModel, selectApplications} from '@/models/application'
import styles from './page.module.scss'
import { imageUrl } from '@/utils/image'
import { Button } from '@mui/material'

export default async function Page () {
  const session = await getIdentity()
  if (!session) {
    return <div> 未登录
        </div>
  }

  const basicToken = genBasicToken(session)
  if (!basicToken) {
    return <div> 未登录
        </div>
  }
  const resources = await selectApplications(1, 28, basicToken)

  console.debug('resources:', resources.count)

  return <div className={styles.pageBody}>
    <div className={styles.toolbar}>
        <Button variant="contained" size='small' color="primary">新建应用</Button>
    </div>
    <div className={styles.pageTable}> 
            {
                resources.list.map((item, index) => {
                  return <AppCard key={index} model={item}/>
                })
            } 
        </div>
        </div>
}


function AppCard (props: { model: ApplicationModel }) {
  const updateTimeString = formatRfc3339(props.model.update_time)
  return <div className={styles.appCard}>
            <div className={styles.avatarArea}>
                <div className={styles.avatar}>
                <Image fill={true} src={imageUrl(props.model.image)} alt={'application image'}/>
                </div>
            </div>
            <div className={styles.detailArea}>
                <div className={styles.appTitle}>{props.model.title}</div>
                <div className={styles.appDescription}>{props.model.description}</div>
                <div className={styles.updateTime}>{updateTimeString}</div>
            </div>
        </div> 
}
