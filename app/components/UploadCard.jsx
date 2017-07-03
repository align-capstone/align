import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import {Card, CardMedia, CardText} from 'material-ui/Card'

import firebase from 'APP/fire'
const db = firebase.database()
let captionRef

// MPM we'll receive goalRef, milestoneRef, or checkInRef as props
// in this case, we're basically adding a child (or updating child) for something that already exists
// if milestone or checkIn, we'll also necessarily write to the goalRef (parent)
// if we only get goalRef, we'll want to check whether we can write to milestone or checkIn

export default class extends Component {
  constructor(props) {
    super()
    this.state = {
      caption: ''
    }
  }

  componentDidMount() {
    // When the component mounts, start listening to the fireRef we were given.
    this.listenTo(this.props.goalRef)
  }

  componentWillUnmount() {
    // When we unmount, stop listening.
    this.unsubscribe()
  }

  // MPM making this as dumb as possible for now
  componentWillReceiveProps(incoming, outgoing) {
    // When the props sent to us by our parent component change,
    // start listening to the new firebase reference.
    this.listenTo(incoming.goalRef)
  }

  listenTo(goalRef) {
    // If we're already listening to a ref, stop listening there.
    if (this.unsubscribe) this.unsubscribe()

    let goalID = this.props.goalID
    let uploadID = this.props.uploadID
    // captionRef = goalRef(goalID).uploads(uploadID).child('caption')
    // captionRef = goalRef.child(goalID).uploads(uploadID).child('caption')
    captionRef = db.ref('goals').child(goalID).child('uploads').child(uploadID).child('caption')

    // Whenever our ref's value changes, set {value} on our state
    const captionListener = captionRef.on('value', snapshot => {
      console.log('got in the listener, value: ', snapshot.val())
      this.setState({ caption: snapshot.val() })
    })

    // Set unsubscribe to be a function that detaches the listener.
    this.unsubscribe = () => {
      captionRef.off('value', captionListener)
    }
  }

  writeCaption = (event) => {
    console.log('invoked writeCaption with ', event.target.value)
    captionRef.set(event.target.value)
    // this.setState({
    //   caption: event.target.value
    // })
  }

  render() {
    console.log('props in upload card??', this.props)
    console.log('state in upload card??', this.state)
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Card className="upload-card" style={{width: 300}}>
          <CardMedia style={{padding: 15}}>
            <img src={this.props.url} className="upload-media" />
          </CardMedia>
          <CardText>
            <TextField
              hintText='Add a caption for this upload'
              value={this.state.caption || ''}
              onChange={this.writeCaption}
              id='caption'
            />
          </CardText>
        </Card>
      </MuiThemeProvider>
    )
  }
}

// MPM here's the version that was just a presentational component
/*
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
*/
