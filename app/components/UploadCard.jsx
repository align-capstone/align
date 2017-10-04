import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import alignTheme from './AlignTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import {Card, CardMedia, CardText} from 'material-ui/Card'

import firebase from 'APP/fire'
const db = firebase.database()
let captionRef, parentRef, child, childRef

// we're basically adding a child (or updating child) for something that already exists
// this component will receive goalRef, plus optional milestoneRef or checkInRef, as props
  // if we have milestone or checkIn refs, we'll also want to write to the goalRef (parent)?
  // BUT if we only get goalRef, we'll also want to check whether we can write to milestone or checkIn?

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

  componentWillReceiveProps(incoming, outgoing) {
    // When the props sent by our parent component change, start listening to the new reference.
    this.listenTo(incoming.goalRef)
  }

  listenTo(goalRef) {
    // If we're already listening to a ref, stop listening there.
    if (this.unsubscribe) this.unsubscribe()

    let mileId = this.props.milestoneId
    let checkInId = this.props.checkInId
    const uploadId = this.props.uploadId

    // what if we just make it so that you can't update captions for mstone / checkin uploads on the goal??
    if (this.props.milestoneRef) {
      captionRef = goalRef.child('milestones').child(mileId).child('uploads').child(uploadId).child('caption')
      parentRef = goalRef.child('uploads').child(uploadId).child('caption')
    } else if (this.props.checkInRef) {
      captionRef = goalRef.child('checkIns').child(checkInId).child('uploads').child(uploadId).child('caption')
      parentRef = goalRef.child('uploads').child(uploadId).child('caption')
    } else {
      captionRef = goalRef.child(uploadId).child('caption')
    }

    /*
    // here's an attempt to start doing this by child instead of by parent. requires adjusting what we pass down as goalRefs
    const uploadId = this.props.uploadId
    const mileId = goalRef.child(uploadId).child('milestoneId') || null
    const checkInId = goalRef.child(uploadId).child('checkInId') || null

    captionRef = goalRef.child('uploads').child(uploadId).child('caption')
    if (mileId) {
      childRef = goalRef.child('milestones').child(mileId).child('uploads').child(uploadId).child('caption')
    } else if (checkInId) {
      childRef = goalRef.child('checkIns').child(checkInId).child('uploads').child(uploadId).child('caption')
    } else {
      childRef = null // ??
    }
    */

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
    if (parentRef) parentRef.set(event.target.value)
    if (childRef) childRef.set(event.target.value)
  }

  render() {
    const textStyle = { width: 215 }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(alignTheme)}>
        <Card className="upload-card" style={{width: 250}}>
          <CardMedia style={{padding: 15}}>
            <img src={this.props.url} className="upload-media" />
          </CardMedia>
          <CardText>
            <TextField
              hintText='Add a caption for this upload'
              value={this.state.caption || ''}
              onChange={this.writeCaption}
              id='caption'
              multiLine={true}
              style={textStyle}
            />
          </CardText>
        </Card>
      </MuiThemeProvider>
    )
  }
}
