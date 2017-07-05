// this is a presentational component that we'll call for each resource
// basically just a render function that will return the resource 'card'
// MPM okay LIES

// a resource card should contain: title, thumbnail photo, and a description at the bottom, and it should link somewhere

import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

import firebase from 'APP/fire'
const db = firebase.database()

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import alignTheme from './AlignTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card'
import ContentEdit from 'material-ui/svg-icons/content/create'
import ContentLink from 'material-ui/svg-icons/content/link'
import Delete from 'material-ui/svg-icons/content/clear'

let urlRef, titleRef, imageRef, descriptionRef, milestoneRef

export default class extends Component {
  constructor(props) {
    super()
    this.state = {
      title: '',
      url: '',
      image: '',
      description: ''
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

    titleRef = fireRef.titleRef
    urlRef = fireRef.urlRef
    imageRef = fireRef.imageRef
    descriptionRef = fireRef.descriptionRef
    milestoneRef = fireRef.milestoneRef

    // Whenever our ref's value changes, set {value} on our state.
    // const listener = fireRef.on('value', snapshot =>
    //   this.setState({value: snapshot.val()}))

    const titleListener = titleRef.on('value', snapshot =>
      this.setState({ title: snapshot.val() }))

    const urlListener = urlRef.on('value', snapshot => {
      this.setState({ url: snapshot.val() })
    })

    const imageListener = imageRef.on('value', snapshot => {
      this.setState({ image: snapshot.val() })
    })

    const descriptionListener = descriptionRef.on('value', snapshot => {
      this.setState({ description: snapshot.val() })
    })

    const milestoneListener = milestoneRef.on('value', snapshot => {
      this.setState({ mileId: snapshot.val() })
    })

    // Set unsubscribe to be a function that detaches the listener.
    this.unsubscribe = () => {
      titleRef.off('value', titleListener)
      urlRef.off('value', urlListener)
      imageRef.off('value', imageListener)
      descriptionRef.off('value', descriptionListener)
      milestoneRef.off('value', milestoneListener)
    }
  }

  deleteResource = () => {
    // we want to delete resources from the goal they live on, as well as the milestone if one exists
    // for now, though, don't delete resources from resources object itself (on same level as goals)
    const resourceId = this.props.id
    const goalId = this.props.goalId
    const milestoneId = this.state.mileId
    console.log('can we access milestone id??', milestoneId)

    this.unsubscribe()

    let dataToDelete = {}
    // set resource to null on goals object
    dataToDelete[`/goals/${goalId}/resources/${resourceId}`] = null
    // if resources also exists on a milestone, set it to null too
    if (this.state.mileId) {
      dataToDelete[`/goals/${goalId}/milestones/${milestoneId}/resources/${resourceId}`] = null
    }
    console.log('data to delete??', dataToDelete)
    db.ref().update(dataToDelete, function(error) {
      if (error) {
        console.log('Error deleting data: ', error)
      }
    })
  }

  render() {
    // Rendering form with material UI
    // do we maybe want a ternary that either renders a text preview or the full description????
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(alignTheme)}>
        <Card className="resource-card" style={{width: 250}} initiallyExpanded={true}>
          <CardHeader
            title={this.state.title}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardMedia style={{padding: 15}}>
            <img src={this.state.image ? this.state.image : '/default-placeholder.jpg'} className="resource-img" />
          </CardMedia>
          <CardText expandable={true}>
            {this.state.description}
          </CardText>
          <CardActions expandable={true}>
            <FlatButton
              href={this.state.url}
              target="_blank"
              label="Link to resource"
              icon={<ContentLink />}
            />
            {/*
            <FlatButton
              label="Edit resource"
              icon={<ContentEdit />}
            />
            */}
            <FlatButton
              label="Delete resource"
              secondary={true}
              icon={<Delete />}
              onClick={this.deleteResource}
            />
          </CardActions>
        </Card>
      </MuiThemeProvider>
    )
  }
}
