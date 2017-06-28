import React from 'react'
import { Link, browserHistory } from 'react-router'

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import FlatButton from 'material-ui/FlatButton'

import {AppBar, Tabs, Tab} from 'material-ui'

import WhoAmI from './WhoAmI'

import firebase from 'APP/fire'

// Get the auth API from Firebase.
const auth = firebase.auth()

// auth.onAuthStateChanged(user => user || auth.signInAnonymously())

export default function Navbar(props) {
  return (
    <AppBar title="align">
      <Link to="/login">loginpage</Link>
      <WhoAmI auth={auth}/>
    </AppBar>
  )
}
