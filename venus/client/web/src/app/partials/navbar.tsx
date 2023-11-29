import styles from './navbar.module.css'

export function NavHeader () {
  return <div className={styles.headerRow}>
      <div>
        <a className={styles.navLink} href='/'>首页</a>&nbsp;
        <a className={styles.navLink} href='/'>图片</a>
      </div>
    </div>
}
