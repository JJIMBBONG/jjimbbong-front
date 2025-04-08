import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

export default function Auth() {
  return (
    <div id='auth-wrapper'>
      <div className='auth-box'>
        <SignIn />
        <SignUp />
      </div>
    </div>
  )
}
