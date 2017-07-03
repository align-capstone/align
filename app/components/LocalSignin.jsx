import React from 'react'
import firebase from 'APP/fire'
import { browserHistory } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

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
        <div>
          <form className="loginform" onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <TextField name="email"
                floatingLabelText="Email" onChange={this.handleChange} />
            </div>
            <div className='form-group'>
              <TextField name="password"
                floatingLabelText="Password" onChange={this.handleChange} />
            </div>
            <div className='form-group'>
              <RaisedButton label="Login" type="submit" secondary={true} style={buttonStyle} />
            </div>
          </form>

          {this.state.showInvalidAlert ? this.handleFailedLogin(this.state.errorMessage) : null}
        </div>
      </MuiThemeProvider>
    )
  }
}

          // <input name="email" onChange={this.handleChange} />
          // <input name="password" onChange={this.handleChange} />