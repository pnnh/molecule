import Image from 'next/image' 
import {genBasicToken} from '@/models/session' 
import {formatRfc3339} from '@/utils/datetime'
import { getIdentity } from '@/services/auth'
import styles from './page.module.scss'
import { imageUrl } from '@/utils/image'
import { serverSelectAccounts } from '@/services/server/account'
import { AccountModel } from '@/models/account'

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
  const selectResult = await serverSelectAccounts(1, 28, basicToken)

  return <div className={styles.userList}>
            <div className={styles.toolbar}>工具栏</div> 
            <div className={styles.userGrid}>
            {
                selectResult.list.map((item, index) => {
                  return <TableRow key={index} model={item}/>
                })
            } 
            </div>
        </div> 
}


function TableRow (props: { model: AccountModel }) { 
  const updateTimeString = formatRfc3339(props.model.update_time)
  return <div className={styles.userCard}>  
            <div className={styles.photoArea}> 
                    <Image fill={true} src={imageUrl(props.model.photo)} alt={'icon'}/>
               
            </div>
            <div className={styles.detailArea}>
                <div className={styles.username}>
                    {props.model.username}
                </div>
                <div className={styles.mail}>
                    {props.model.mail}
                </div>
                <div className={styles.description}>
                    {props.model.description}
                </div>
                <div className={styles.updateTime}>
                    {updateTimeString}
                </div>
            </div>
    </div>
}
