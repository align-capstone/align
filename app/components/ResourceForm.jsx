import React, {Component} from 'react'
let resourceRef, titleRef, urlRef, imageRef, descriptionRef

import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import TextField from 'material-ui/TextField'

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

  // componentWillReceiveProps(incoming, outgoing) {
  //   this.listenTo(incoming.fireRef)
  // }

  // instead of (or in addition to?) calling getPageInfo in onBlur function, call it as onSubmit ??
  getPageInfo = (target) => {
    // make our ajax request in here
    $.ajax({
      url: 'http://api.linkpreview.net',
      dataType: 'jsonp',
      data: {q: target, key: '59546c0da716e80a54030151e45fe4e025d32430c753a'},
      success: function(response) {
        console.log(response)
        // and then write to firebase with the results
        // writeURL(response.url) etc. etc.
      }
    })
  }

  writeURL = (url) => {
    urlRef.set(url)
  }

  writeTitle = (title) => {
    titleRef.set(title)
  }

  writeImage = (image) => {
    imageRef.set(image)
  }

  writeDescription = (description) => {
    descriptionRef.set(description)
  }

  // don't write URL yet... first, make the ajax request
  // THEN write title, image, and description based on JSON returned by ajax call

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <h3>Add a resource below</h3>
          <div className='form-group'>
            <TextField
              // autoFocus
              hintText='Paste a URL here'
              floatingLabelText='URL'
              // value={this.state.url}
              onChange={console.log(this.value)} // set state in here??
              onFocus={console.log('focused lol')}
              // onBlur={console.log('blurred ', this.value) /* this.getPageInfo(this.value) */ }
              onFocusOut={console.log('unfocused ', this.value)}
              id='url'
            />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
