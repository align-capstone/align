import React from 'react'
import firebase from 'APP/fire'

export default class extends React.Component {
  componentDidMount() {
    const {auth} = this.props
    this.unsubscribe = auth.onAuthStateChanged(user => this.setState({user}))
    setTimeout(() => this.setState({ready: true}), 200)
  }

  componentWillUnmount() {
   // this.unsubscribe()
  }

  render() {
    const {user, ready} = this.state || {}
    const {Landing, Loader, children} = this.props
    if (user) return children
    if (!ready) return <Loader />
    return <Landing />
  }
}
