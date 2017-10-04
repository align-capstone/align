import React from 'react'
import firebase from 'APP/fire'
import {browserHistory} from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import alignTheme from './AlignTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
const auth = firebase.auth()

export const name = user => {
  if (!user) {
    return 'Nobody'
  }
  return user.displayName
}

export const WhoAmI = ({user, auth}) =>
  <div className="whoami">
    <span>{name(user)}</span>
    <MuiThemeProvider muiTheme={getMuiTheme(alignTheme)}>
      <FlatButton label="Log Out" onTouchTap={() => {
        auth.signOut()
        .then(() => { // After logging out, redirect to login/landing page
          browserHistory.push('/')})
      }} primary={true} />
    </MuiThemeProvider>
  </div>

export default class extends React.Component {
  componentDidMount() {
    const {auth} = this.props
    this.unsubscribe = auth.onAuthStateChanged(user => this.setState({user}))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const {user} = this.state || {}
    return <WhoAmI user={user} auth={auth}/>
  }
}
