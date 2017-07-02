import React from 'react'
import firebase from 'APP/fire'
import { PanelGroup, Panel } from 'react-bootstrap'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import LocalSignin from './LocalSignin'
import LocalSignup from './LocalSignup'

const google = new firebase.auth.GoogleAuthProvider()
// google.addScope('https://www.googleapis.com/auth/contacts.readonly'); //use this potentially to get calendar read/writeaccess????


const handleGoogleLogin = () => {

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





// NOTE: change accordion to something Material-UI? --SC

export default ({ auth }) => {

  return (
    <div id="landing">
      <PanelGroup accordion>
        <Panel header="Sign up" eventKey="1"><LocalSignup /></Panel>
        <Panel header="Log in" eventKey="2"><LocalSignin /></Panel>
        <Panel header="Log in with another account" eventKey="3">
          <FlatButton
            onClick={handleGoogleLogin}
            label="Google"
            secondary={true}
            icon={<FontIcon className="muidocs-icon-custom-github" />}
          /></Panel>
      </PanelGroup>
    </div>

  )

}