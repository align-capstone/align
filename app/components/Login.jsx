import React from 'react'
import firebase from 'APP/fire'

import LocalSignin from './LocalSignin'
import LocalSignup from './LocalSignup'

const google = new firebase.auth.GoogleAuthProvider()
// google.addScope('https://www.googleapis.com/auth/contacts.readonly'); //use this potentially to get calendar read/writeaccess????


const handleGoogleLogin = () => {

  console.log('in handleGoogleLogin!')

  firebase.auth().signInWithPopup(google).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

}

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

  return (
    <div>
      <div>
        <h3>Signup:</h3>
        <LocalSignup />
      </div>
      <div>
        <h3>Login Locally:</h3>
        <LocalSignin />
      </div>
      <div>
        <h3>Login with Google:</h3>
        <button className='google login'
          onClick={handleGoogleLogin}>Login with Google</button>
      </div>
    </div>
  )

}

