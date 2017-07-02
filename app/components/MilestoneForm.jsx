import React from 'react'
import { Link } from 'react-router'
let nameRef, descriptionRef, isOpenRef, dateRef, uploadsRef, parentRef, resourcesRef

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import UploadForm from './Upload'
import ResourceCard from './ResourceCard'
import ResourceForm from './ResourceForm'
import ResourceContainer from './ResourceContainer'

export default class extends React.Component {
  constructor(props) {
    super()
    this.state = {
      name: '',
      description: '',
      isOpen: true,
      date: new Date().getTime()
    }
  }

  componentDidMount() {
    // When the component mounts, start listening to the fireRef
    // we were given.
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

    nameRef = fireRef.nameRef
    descriptionRef = fireRef.descriptionRef
    isOpenRef = fireRef.isOpenRef
    dateRef = fireRef.dateRef
    uploadsRef = fireRef.uploadsRef
    parentRef = fireRef.parentRef
    resourcesRef = fireRef.resourcesRef

    // Whenever our ref's value changes, set {value} on our state.
    // const listener = fireRef.on('value', snapshot =>
    //   this.setState({value: snapshot.val()}))

    const nameListener = nameRef.on('value', snapshot =>
      this.setState({ name: snapshot.val() }))

    const descriptionListener = descriptionRef.on('value', snapshot => {
      this.setState({ description: snapshot.val() })
    })

    const isOpenListener = isOpenRef.on('value', snapshot => {
      this.setState({ isOpen: snapshot.val() })
      if (snapshot.val() === null) isOpenRef.set(true)
    })

    const dateListener = dateRef.on('value', snapshot => {
      this.setState({ date: snapshot.val() })
      if (snapshot.val() === null) dateRef.set(new Date().getTime())
    })

    const resourcesListener = resourcesRef.on('value', snapshot => {
      if (snapshot.val()) this.setState({ resources: Object.keys(snapshot.val()) })
    })

    const uploadsListener = uploadsRef.on('value', snapshot => {
      if (snapshot.val()) this.setState({ uploads: Object.values(snapshot.val()) })
    })

    // Set unsubscribe to be a function that detaches the listener.
    this.unsubscribe = () => {
      nameRef.off('value', nameListener)
      descriptionRef.off('value', descriptionListener)
      isOpenRef.off('value', isOpenListener)
      dateRef.off('value', dateListener)
      resourcesRef.off('value', resourcesListener)
      uploadsRef.off('value', uploadsListener)
    }
  }

  // Write is defined using the class property syntax.
  // This is roughly equivalent to saying,
  //
  //    this.write = event => (etc...)
  //
  // in the constructor. Incidentally, this means that write
  // is always bound to this.
  writeName = (event) => {
    nameRef.set(event.target.value)
  }

  writeDescription = (event) => {
    descriptionRef.set(event.target.value)
  }

  writeIsOpen = (event, id) => {
    // for 'isOpen', we're setting it to false if the user says they already achieved it, or true if they say they haven't
    if (id === 0) {
      isOpenRef.set(false)
    }
    if (id === 1) {
      isOpenRef.set(true)
    }
  }

  writeDate = (event, date) => {
    dateRef.set(date.getTime())
  }

  render() {
    // Rendering form with material UI
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <Link to={`/goal/${this.props.goalId}`}>Back to goal</Link>
            <br/>
          <Link to='/timelines'>Back to timelines</Link>
          <h1>Edit page for milestone: <span id='milestoneName'>{this.state.name}</span></h1>
          <div className='form-group'>
            <TextField
              hintText='Your milestone name'
              floatingLabelText='Name'
              value={this.state.name}
              onChange={this.writeName}
              id='name'
            />
          </div>
          <div className='form-group'>
            <TextField
              hintText='What do you want to do?'
              floatingLabelText='Description'
              value={this.state.description}
              onChange={this.writeDescription}
              id='description'
            />
          </div>
          <div className='form-group'>
            <SelectField
              floatingLabelText='Is this milestone achieved?'
              value={this.state.isOpen}
              onChange={this.writeIsOpen}
            >
              <MenuItem value={false} id='isntOpen' primaryText='Yes!' />
              <MenuItem value={true} id='isOpen' primaryText='Not yet...' />
            </SelectField>
          </div>
          <div className='form-group'>
            <DatePicker id='date' value={new Date(this.state.date)} onChange={this.writeDate} floatingLabelText='When do you hope to accomplish this milestone?' />
          </div>
          <div>
            <h3>Add a resource:</h3>
            <ResourceForm goalRef={parentRef} milestoneRef={resourcesRef} milestoneId={this.props.milestoneId} />
          </div>
          <div>
            <h3>Resources:</h3>
            { this.state.resources && this.state.resources.map((resourceID, index) => {
              return (
                <div key={resourceID}>
                  <ResourceContainer resourceID={resourceID} />
                </div>
                )
              })
            }
          </div>
          <div>
            <h3>Uploads:</h3>
            <UploadForm goalRef={parentRef} milestoneRef={uploadsRef} milestoneId={this.props.milestoneId} />
            { this.state.uploads && this.state.uploads.map((upload, index) => {
                return (
                  <img key={index} src={upload.imageURL} />
                )
              })
            }
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
