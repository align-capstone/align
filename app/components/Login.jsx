import React from 'react'
import firebase from 'APP/fire'
import { PanelGroup, Panel } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';


import LocalSignin from './LocalSignin'
import LocalSignup from './LocalSignup'


const google = new firebase.auth.GoogleAuthProvider()
// google.addScope('https://www.googleapis.com/auth/contacts.readonly'); //use this potentially to get calendar read/writeaccess????


// If you want to request additional permissions, you'd do it
// like so:
//
// google.addScope('https://www.googleapis.com/auth/plus.login')
//
// What kind of permissions can you ask for? There's a lot:
//   https://developers.google.com/identity/protocols/googlescopes
//
// For instance, this line will request the ability to read, send,
// and generally manage a user's email:
//
// google.addScope('https://mail.google.com/')

const tabStyles = {
  headline: {
    fontSize: 4,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
    fontSize: '125%'
  },
}


export default class LandingPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      slideIndex: 0,
    }
  }

  handleTabChange = (value) => {
    this.setState({
      slideIndex: value,
    })
  }

  // handleGoogleLogin() {
  //   firebase.auth().signInWithPopup(google).then(function (result) {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     var token = result.credential.accessToken;
  //     // The signed-in user info.
  //     var user = result.user;
  //     // ...
  //   }).catch(function (error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // The email of the user's account used.
  //     var email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     var credential = error.credential;
  //     // ...
  //   })
  // }

  componentDidMount() {
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(https://s-media-cache-ak0.pinimg.com/736x/4f/5f/7d/4f5f7d794a8c075a2080528e9c0b0dbf--phone-backgrounds-wallpaper-backgrounds.jpg)'
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.backgroundImage = ''
  }

  render() {
    return (
      <div id="landing">
        <Tabs onChange={this.handleTabChange} value={this.state.slideIndex}>
          <Tab label="Sign up" value={0} />
          <Tab label="Log in" value={1} />
        </Tabs>
        <SwipeableViews index={this.state.slideIndex}
          onChangeIndex={this.handleTabChange}>
          <div style={tabStyles.slide}>
            <LocalSignup />
          </div>
          <div style={tabStyles.slide}>
            <LocalSignin />
          </div>
        </SwipeableViews>
      </div>
    )
  }
}