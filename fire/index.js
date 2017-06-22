const firebase = require('firebase')

// -- // -- // -- // Firebase Config // -- // -- // -- //
const config = {
  apiKey: "AIzaSyAv8u4ojMJxzEykV47bgeL4U2dIKBu5x0o",
  authDomain: "align-a0b08.firebaseapp.com",
  databaseURL: "https://align-a0b08.firebaseio.com",
  projectId: "align-a0b08",
  storageBucket: "align-a0b08.appspot.com",
  messagingSenderId: "578906705389"
}
// -- // -- // -- // -- // -- // -- // -- // -- // -- //

// Initialize the app, but make sure to do it only once.
//   (We need this for the tests. The test runner busts the require
//   cache when in watch mode; this will cause us to evaluate this
//   file multiple times. Without this protection, we would try to
//   initialize the app again, which causes Firebase to throw.
//
//   This is why global state makes a sad panda.)
firebase.__bonesApp || (firebase.__bonesApp = firebase.initializeApp(config))

module.exports = firebase
