import React from 'react'
import firebase from 'APP/fire'
import { browserHistory } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const db = firebase.database()
const usersRef = db.ref('users')
let newUser
const buttonStyle = {
  margin: 12,
}

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
      <div style={{ color: 'red' }}>
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
      .then(() => firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.updateProfile({
            displayName: this.state.name
          })
        }
      }))
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
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <form className="signupform" onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <TextField name="name"
                floatingLabelText="Name" onChange={this.handleChange} />
            </div>
            <div className='form-group'>
              <TextField name="email"
                floatingLabelText="Email" onChange={this.handleChange} />
            </div>
            <div className='form-group'>
              <TextField name="password"
                floatingLabelText="Password" onChange={this.handleChange} />
            </div>
            <div className='form-group'>
              <RaisedButton label="Sign Up" type="submit" secondary={true} style={buttonStyle} />
            </div>
          </form>

          {this.state.showInvalidAlert ? this.handleFailedLogin(this.state.errorMessage) : null}
        </div>
      </MuiThemeProvider>
    )
  }
}