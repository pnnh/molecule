export default async function Home (props: { [key: string]: any }) {
  const postUrl = '/oauth2/auth?client_id=pwa&redirect_uri=https%3A%2F%2Fdebug.polaris.direct%2Fserver%2Foauth2%2Fcode&response_type=code&scope=openid&state=some-random-state-foobar&nonce=some-random-nonce'
  console.log('Home', props)
  return <div>
      <h1>授权页面</h1>
      <div>
      <h1>Login page</h1>
 <p>Howdy! This is the log in page. For this example, it is enough to supply the username.</p>
    <form id="loginPost" method="post" action={postUrl}>
  
    By logging in, you consent to grant these scopes:
    <ul><li><input type="checkbox" name="scopes" value="photos" />photos</li>
                    <li><input type="checkbox" name="scopes" value="openid" />openid</li>
                    <li><input type="checkbox" name="scopes" value="offline" />offline</li></ul>
           
                <button>提交</button>
    </form>   
      </div>
    </div>
}
