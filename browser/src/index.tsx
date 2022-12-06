import ReactDOM from 'react-dom/client'
import React from 'react'
import {registerUser, loginUser} from './webauthn'
import './index.scss' 

import $ from 'jquery'


function LoginPage () {
  return <div>
      Username: 
  <input type="text" name="username" id="email" value='larry' placeholder="i.e. foo@bar.com"/> 
  <button onClick={registerUser}>Register</button>
  <button onClick={loginUser}>Login</button>
  </div>
}

$(function () {

  const goTopElement2 = $('#root').get(0)
  if (goTopElement2) { 
    const root = ReactDOM.createRoot(goTopElement2)
    root.render(<LoginPage/>)
  }
  
})

 
console.debug('async fun2', location.pathname)

