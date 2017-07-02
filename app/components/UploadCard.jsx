import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import {Card, CardMedia, CardText} from 'material-ui/Card'

// MPM do we want to be able to add title / text to upload cards??
// put that stuff on state?

// have a handleChange function that sets the caption???
  // handleChange = (event) => {
  //   this.setState({
  //     caption: event.target.value
  //   })
  // }

/*
export default class extends Component {
  constructor(props) {
    super()
    this.state = {
      caption: ''
    }
  }

  componentDidMount() {
    // When the component mounts, start listening to the fireRef we were given.
    this.listenTo(this.props.fireRef)
  }

  componentWillUnmount() {
    // When we unmount, stop listening.
    this.unsubscribe()
  }

  componentWillReceiveProps(incoming, outgoing) {
    // When the props sent to us by our parent component change,
    // start listening to the new firebase reference.
    this.listenTo(incoming.fireRef)
  }

  listenTo(fireRef) {
    // If we're already listening to a ref, stop listening there.
    if (this.unsubscribe) this.unsubscribe()
    captionRef = fireRef.captionRef

    // Whenever our ref's value changes, set {value} on our state
    const captionListener = captionRef.on('value', snapshot => {
      this.setState({ caption: snapshot.val() })
    })

    // Set unsubscribe to be a function that detaches the listener.
    this.unsubscribe = () => {
      captionRef.off('value', captionListener)
    }
  }

  writeCaption = (event) => {
    captionRef.set(event.target.value)
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Card className="upload-card" style={{width: 300}}>
          <CardMedia style={{padding: 15}}>
            <img src={this.props.url} className="upload-media" />
          </CardMedia>
          <CardText>
            <TextField hintText='Add a caption for this upload' />
          </CardText>
        </Card>
      </MuiThemeProvider>
    )
  }
}
*/

// THE OLD VERSION GO BACK TO THIS I MISS IT
export default function UploadCard(props) {
  console.log('props in upload card??', props)
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Card className="upload-card" style={{width: 300}}>
        <CardMedia style={{padding: 15}}>
          <img src={props.url} className="upload-media" />
        </CardMedia>
        <CardText>
          <TextField hintText='Add a caption for this upload' />
        </CardText>
      </Card>
    </MuiThemeProvider>
  )
}
