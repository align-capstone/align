import React from 'react'
import firebase from 'APP/fire'
import { browserHistory } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FontIcon from 'material-ui/FontIcon'

const google = new firebase.auth.GoogleAuthProvider()

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

  handleGoogleLogin() {
    firebase.auth().signInWithPopup(google).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    })
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
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
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
        <div className='login'>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <TextField name="email"
                floatingLabelText="Email" onChange={this.handleChange} />
            </div>
            <div className='form-group'>
              <TextField name="password"
                floatingLabelText="Password" onChange={this.handleChange} />
            </div>
            <div className='form-group'>
              <RaisedButton label="Log In" type="submit" primary={true} style={buttonStyle} />
            </div>
          </form>
          <hr />
          <div style={{'paddingBottom': '.5em'}}>Or:</div>
          <div>
            <RaisedButton
              onClick={this.handleGoogleLogin}
              label="Log in with Google"
              secondary={true}
            />
          </div>

          {this.state.showInvalidAlert ? this.handleFailedLogin(this.state.errorMessage) : null}
        </div>
      </MuiThemeProvider>
    )
  }
}