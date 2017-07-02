import React from 'react'
import { Link, browserHistory } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FlatButton from 'material-ui/FlatButton'

import { AppBar, Tabs, Tab } from 'material-ui'

import WhoAmI from './WhoAmI'

import firebase from 'APP/fire'
const auth = firebase.auth()

// // Get the auth API from Firebase.
// const auth = firebase.auth()
// console.log('whats on auth???', auth)
// console.log('auth.currentUser???,', auth.currentUser)


// export default function Navbar(props) {
//   return (
//     <AppBar title="align" style={{backgroundColor: 'transparent', color: 'black', boxShadow: 'none'}} onTitleTouchTap={handleTitleTouchTap}>
//       {auth.currentUser ? console.log('in yes user') : console.log('in null')}
//       <WhoAmI auth={auth}/>
//     </AppBar>
//   )
// }

// // <WhoAmI auth={auth}/>


export const Navbar = ({ user, auth }) =>
  <AppBar title="align" style={{ backgroundColor: 'transparent', color: 'black', boxShadow: 'none' }} onTitleTouchTap={() => browserHistory.push('/')}>
    {auth.currentUser ? <WhoAmI auth={auth} /> : null}
  </AppBar>

export default class extends React.Component {

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
