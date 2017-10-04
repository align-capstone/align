import React from 'react'
import firebase from 'APP/fire'
import { PanelGroup, Panel } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import alignTheme from './AlignTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import LocalSignin from './LocalSignin'
import LocalSignup from './LocalSignup'

const google = new firebase.auth.GoogleAuthProvider()

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

  componentDidMount() {
    let newImage = document.createElement('img')
    newImage.setAttribute('src', './lines3.png')
    newImage.setAttribute('id', 'login-image')
    newImage.setAttribute('style', 'margin-top: -421px; width: 100vw;')
    document.body.appendChild(newImage)
    document.getElementById('main').setAttribute('style', 'position: relative;')
  }

  componentWillUnmount() {
    let rmImage = document.getElementById('login-image')
    document.body.removeChild(rmImage)
    document.getElementById('main').setAttribute('style', 'position: initial;')
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(alignTheme)}>
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
      </MuiThemeProvider>
    )
  }
}
