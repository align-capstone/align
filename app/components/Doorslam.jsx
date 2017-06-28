import React from 'react'
import firebase from 'APP/fire'
// import {browserHistory} from 'react-router'

// export const name = user => {
//   if (!user) {
//     return 'Nobody'
//   }
//   return user.displayName || user.email
// }

// export const WhoAmI = ({user, auth}) =>
//   <div className="whoami">
//     <span>Hello, {name(user)}</span>
//     { <button className='logout' onClick={() => {
//       auth.signOut()
//       .then(() => { //after logging out, redirect to login/landing page
//         browserHistory.push('/login')})
//     }}>logout</button> }
//   </div>

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
    const {Landing, children} = this.props
    return user ? children : <Landing />
  }
}