'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import FlatButton from 'material-ui/FlatButton'
import { AppBar, FlatButton } from 'material-ui'

// import theme from '../src/material_ui_raw_theme_file'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'

import Upload from './components/Upload'
import GoalFormContainer from './components/GoalFormContainer'
import MilestoneFormContainer from './components/MilestoneFormContainer'
import VictoryExample from './components/VictoryExample'
import Timelines from './components/Timelines'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Doorslam from './components/Doorslam'

import firebase from 'APP/fire'

// Get the auth API from Firebase.
const auth = firebase.auth()

// Ensure that we have (almost) always have a user ID, by creating
// an anonymous user if nobody is signed in.
// auth.onAuthStateChanged(user => user || auth.signInAnonymously())

// Further explanation:
//
// Whenever someone signs in or out (that's an "authStateChange"),
// firebase calls our callback with the user. If nobody is signed in,
// firebase calls us with null. Otherwise, we get a user object.
//
// This line of code thus keeps us logged in. If the user isn't signed
// in, we sign them in anonymously. This is useful, because when the user
// is signed in (even anonymously), they'll have a user id which you can
// access with auth.currentUser.uid, and you can use that id to create
// paths where you store their stuff. (Typically you'll put it somewhere
// like /users/${currentUser.uid}).
//
// Note that the user will still be momentarily null, so your components
// must be prepared to deal with that. This is unavoidable—with Firebase,
// the user will always be null for a moment when the app starts, before
// the authentication information is fetched.
//
// If you don't want this behavior, just remove the line above.

// Our root App component just renders a little frame with a nav
// and whatever children the router gave us.
const App = ({ children }) =>
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <div>
      <Navbar />
      {/* In theory you can use MUI components in this and its children? http://www.material-ui.com/#/components */}
      {/* Render our children (whatever the router gives us) */}
      <Doorslam auth={auth} Landing={Login}>{children}</Doorslam>
    </div>
  </MuiThemeProvider>

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="timelines" />
      <Route path="goal/:id" component={GoalFormContainer} />
      <Route path="milestone/:id/:mid" component={MilestoneFormContainer} />
      <Route path="/victory-example" component={VictoryExample} />
      <Route path="/timelines" component={Timelines} />
      {/* <Route path="/timelines/:id" component={Timelines} /> */}
      <Route path="/upload" component={Upload} />
      <Route path="/login" component={Login} />
    </Route>
    <Route path='*' component={NotFound} />
  </Router>,
  document.getElementById('main')
)
