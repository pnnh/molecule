import Link from 'next/link'

export default function Page () {
  return <div>
    <h1>您尚未登陆或已过期2</h1>
    <Link className={'link'} href="/account/signin">前往登陆</Link>
  </div>
}
