import React from 'react'
import firebase from 'APP/fire'

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
