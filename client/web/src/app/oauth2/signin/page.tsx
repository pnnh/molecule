import queryString from 'query-string'
import styles from './page.module.scss'
import {FormEdit} from './partials/form'

export default async function Home ({searchParams}: { searchParams: { authinfo: string } }) {
  const authInfo = searchParams.authinfo
  const query = queryString.stringify(searchParams)
  const postUrl = 'https://authsvc.bitpie.xyz/oauth2/signin?' + query
  return <div className={styles.loginContainer}>
        <div className={styles.mainBox}>
            <div className={styles.boxTitle}>
                登陆页面
            </div>
            <FormEdit server={postUrl}/>
        </div>
    </div>
}
