// this is a presentational component that we'll call for each resource
// basically just a render function that will return the resource 'card'
// MPM okay LIES

// a resource card should contain: title, thumbnail photo, and a description at the bottom, and it should link somewhere

import React, { Component } from 'react'
import { Link } from 'react-router'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card'
import ContentEdit from 'material-ui/svg-icons/content/create'
import ContentLink from 'material-ui/svg-icons/content/link'

let urlRef, titleRef, imageRef, descriptionRef

export default class extends Component {
  constructor(props) {
    super()
    this.state = {
      // resourceID: '',
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

    // Set unsubscribe to be a function that detaches the listener.
    this.unsubscribe = () => {
      titleRef.off('value', titleListener)
      urlRef.off('value', urlListener)
      imageRef.off('value', imageListener)
      descriptionRef.off('value', descriptionListener)
    }
  }

  render() {
    // Rendering form with material UI
    // do we maybe want a ternary that either renders a text preview or the full description????
    console.log('state from resource component: ', this.state)
    console.log('props inside resource ARE REFS HERE???', this.props)
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Card className="resource-card" style={{width: 300}}>
          <CardHeader
            title={this.state.title}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardMedia style={{padding: 15}}>
            <img src={this.state.image} className="resource-img" />
          </CardMedia>
          <CardText expandable={true}>
            {this.state.description}
          </CardText>
          <CardActions expandable={true}>
            <FlatButton
              href={this.state.url}
              label="Link to resource"
              primary={true}
              icon={<ContentLink />}
            />
            <FlatButton
              label="Edit resource"
              icon={<ContentEdit />}
            />
          </CardActions>
        </Card>
      </MuiThemeProvider>
    )
  }
}
