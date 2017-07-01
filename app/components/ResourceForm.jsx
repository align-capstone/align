import React, {Component} from 'react'
import firebase from 'APP/fire'
const db = firebase.database()
const resourceRef = db.ref('resources')
// let resourceRef, titleRef, urlRef, imageRef, descriptionRef

import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import {TextField, RaisedButton} from 'material-ui'

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
    this.unsubscribe()
  }

  // move the functions below to our resource component
  // writeURL = (url) => {
  //   urlRef.set(url)
  // }

  // writeTitle = (title) => {
  //   titleRef.set(title)
  // }

  // writeImage = (image) => {
  //   imageRef.set(image)
  // }

  // writeDescription = (description) => {
  //   descriptionRef.set(description)
  // }

  // don't write URL yet... first, make the ajax request
  // THEN write title, image, and description based on JSON returned by ajax call

  handleChange = (event) => {
    this.setState({
      url: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const target = this.state.url
    $.ajax({
      url: 'http://api.linkpreview.net',
      dataType: 'jsonp',
      data: {q: target, key: '59546c0da716e80a54030151e45fe4e025d32430c753a'},
      success: function(response) {
        console.log(response)
        let resourceId
        resourceRef.push(response)
        // and here we also want to write to the associated milestone etc.
        // instead of pushing the object, we'll just do .push(), and we'll save it as a variable...
        // newResourceRef = resourceRef.push()
        // newResourceID = newResourceRef.id
        // look at timelines for example
      }
    })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <form onSubmit={this.handleSubmit}>
            <TextField
              autoFocus
              hintText='Paste a URL here'
              floatingLabelText='URL'
              onChange={this.handleChange}
              id='url'
            />
          <div>
            <RaisedButton label="add resource" type="submit" />
          </div>
        </form>
      </MuiThemeProvider>
    )
  }
}
