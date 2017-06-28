import React from 'react'
import firebase from 'APP/fire'

import LocalSignin from './LocalSignin'

// const google = new firebase.auth.GoogleAuthProvider()

// Firebase has several built in auth providers:
// const facebook = new firebase.auth.FacebookAuthProvider()
// const twitter = new firebase.auth.TwitterAuthProvider()
// const github = new firebase.auth.GithubAuthProvider()
// // This last one is the email and password login we all know and
// // vaguely tolerate:
// const email = new firebase.auth.EmailAuthProvider()

// If you want to request additional permissions, you'd do it
// like so:
//
// google.addScope('https://www.googleapis.com/auth/plus.login')
//
// What kind of permissions can you ask for? There's a lot:
//   https://developers.google.com/identity/protocols/googlescopes
//
// For instance, this line will request the ability to read, send,
// and generally manage a user's email:
//
// google.addScope('https://mail.google.com/')

export default ({ auth }) => {

  // <button className='google login'
  //         onClick={() => auth.signInWithPopup(google)}>Login with Google</button>

  return (
    <div>
      <div>
        <h3>Signup:</h3>
      </div>
      <div>
        <h3>Login Locally:</h3>
        <LocalSignin />
      </div>
      <div>
        <h3>Login with Google:</h3>
      </div>
    </div>
  )

}

