import React from 'react'
import firebase from 'APP/fire'
const db = firebase.database()

import {browserHistory} from 'react-router'

let usersRef = db.ref('users')
let newUser

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
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    //   .then((createdUser) => { //now that new user exists, put him under 'users' object in DB
    //     console.log('newUser variable : ', newUser)
    //     newUser = createdUser
    //     let newUserId = newUser.uid
    //     console.log('newUser ID: ', newUserId)
    //     usersRef.child(newUserId).set()
    //   })
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
        <form className="signupform" onSubmit={this.handleSubmit}>
          <input name="name" onChange={this.handleChange}
          <input name="email" onChange={this.handleChange} />
          <input name="password" onChange={this.handleChange} />
          <input type="submit" value="Sign Up" />
        </form>

        {this.state.showInvalidAlert ? this.handleFailedLogin(this.state.errorMessage) : null}
      </div>
    )
  }
}