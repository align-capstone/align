import React from 'react'
import firebase from 'APP/fire'
import {browserHistory} from 'react-router'
import FlatButton from 'material-ui/FlatButton'
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
    <FlatButton label="Log Out" onTouchTap={() => {
      auth.signOut()
      .then(() => { //after logging out, redirect to login/landing page
        browserHistory.push('/')})
    }} primary={true} />
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
