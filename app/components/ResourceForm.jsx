import React, {Component} from 'react'
import firebase from 'APP/fire'
const db = firebase.database()
const resourcesRef = db.ref('resources')

import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import alignTheme from './AlignTheme'
import {TextField, IconButton, RaisedButton} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'

import $ from 'jquery'

export default class extends Component {
  constructor(props) {
    super()
    this.state = {
      url: ''
    }
  }

  componentDidMount() {
    // this.listenTo(this.props.fireRef)
  }

  componentWillUnmount() {
    // this.unsubscribe()
  }

  // don't write URL to firebase yet... first, make the API call
  // then write title, image, and description based on JSON we get back

  handleChange = (event) => {
    this.setState({
      url: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const target = this.state.url
    $.ajax({
      url: 'https://api.linkpreview.net',
      dataType: 'jsonp',
      data: {q: target, key: '59546c0da716e80a54030151e45fe4e025d32430c753a'},
      success: response => {
        console.log('in success handler...')
        let key = resourcesRef.push().key
        if (this.props.milestoneRef) {
          // add resource URL to parent goal's uploads:
          this.props.goalRef.child('resources').child(key).set({
            resourceURL: response.url,
            milestoneId: this.props.milestoneId
          })
          // add resource URL to milestone:
          this.props.milestoneRef.child(key).set({
            resourceURL: response.url
          })
        } else {
          // otherwise, just add resource directly to goal
          this.props.goalRef.child(key).set({
            resourceURL: response.url
          })
        }
        resourcesRef.child(key).set(response)
      }
    })
    this.setState({url: ''})
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(alignTheme)}>
        <form onSubmit={this.handleSubmit}>
            <TextField
              hintText='Paste a URL here'
              floatingLabelText='Add a new resource:'
              floatingLabelShrinkStyle={{'fontSize': 20}}
              onChange={this.handleChange}
              value={this.state.url}
              id='url'
            />
          {this.state.url &&
          <IconButton type="submit" tooltip="click to add" touch={true} tooltipPosition="top-center">
            <ContentAdd />
          </IconButton>
          }
        </form>
      </MuiThemeProvider>
    )
  }
}
