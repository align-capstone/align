import React from 'react'
import firebase from 'APP/fire'

import {browserHistory} from 'react-router'

export default class extends React.Component {
  constructor(props) {
    super()
    this.state = {
      email: '',
      password: '',
      showInvalidAlert: false,
      errorMessage: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleFailedLogin(message) {
    return (
      <div style={{color:'red'}}>
        <h4>{message}</h4>
      </div>
    )
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      showInvalidAlert: false
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log("what's on state now? ", this.state)
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      // redirect to timeline on successful log in
      // .then(() => browserHistory.push('/timelines'))
      .catch(error => {
        const errorMessage = error.message;
        this.setState({
          errorMessage: errorMessage,
          showInvalidAlert: true,
        })
        console.error(error)
      })
  }

  render() {
    return (
      <div>
        <form className="loginform" onSubmit={this.handleSubmit}>
          <input name="email" onChange={this.handleChange} />
          <input name="password" onChange={this.handleChange} />
          <input type="submit" value="Login" />
        </form>

        {this.state.showInvalidAlert ? this.handleFailedLogin(this.state.errorMessage) : null}
      </div>
    )
  }
}