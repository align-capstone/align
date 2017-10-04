'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { AppBar, FlatButton } from 'material-ui'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Upload from './components/Upload'
import GoalFormContainer from './components/GoalFormContainer'
import MilestoneFormContainer from './components/MilestoneFormContainer'
import CheckInFormContainer from './components/CheckInFormContainer'
import Timelines from './components/Timelines'
import Landing from './components/Landing'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Doorslam from './components/Doorslam'

import firebase from 'APP/fire'

// Get the auth API from Firebase.
const auth = firebase.auth()

// Our root App component just renders a little frame with a nav
// and whatever children the router gave us.
const App = ({ children }) =>
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <div>
      <Navbar />
      {/* In theory you can use MUI components in this and its children? http://www.material-ui.com/#/components */}
      {/* Render our children (whatever the router gives us) */}
      <Doorslam auth={auth} Loader={Loader} Landing={Landing}>{children}</Doorslam>
    </div>
  </MuiThemeProvider>

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="timelines" />
      <Route path="goal/:id" component={GoalFormContainer} />
      <Route path="milestone/:id/:mid" component={MilestoneFormContainer} />
      <Route path="checkin/:id/:cid" component={CheckInFormContainer} />
      <Route path="/timelines" component={Timelines} />
      <Route path="/upload" component={Upload} />
    </Route>
    <Route path='*' component={NotFound} />
  </Router>,
  document.getElementById('main')
)
