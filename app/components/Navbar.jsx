import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FlatButton from 'material-ui/FlatButton'

import { AppBar, Tabs, Tab } from 'material-ui'

import WhoAmI from './WhoAmI'

import firebase from 'APP/fire'
const auth = firebase.auth()

export const Navbar = ({ user, auth }) =>
  <AppBar
    style={{ backgroundColor: 'transparent', color: 'black', boxShadow: 'none' }}
    onTitleTouchTap={() => browserHistory.push('/')}
    iconElementLeft={<img src="/logo.jpg" />}
    onLeftIconButtonTouchTap={() => browserHistory.push('/')}
    iconElementRight={auth.currentUser ? <div style={{'fontSize': '125%'}}><WhoAmI auth={auth} /></div> : null }
    iconStyleRight={{display: 'flex', alignItems: 'center', marginTop: 0}}
    id='nav'
    >
  </AppBar>

export default class extends Component {
  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(user => this.setState({ user }))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { user } = this.state || {}
    return <Navbar user={user} auth={auth} />
  }
}
