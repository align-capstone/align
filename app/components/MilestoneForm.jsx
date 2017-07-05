import React from 'react'
import { Link, browserHistory } from 'react-router'

import firebase from 'APP/fire'
const db = firebase.database()
const goalsRef = db.ref('goals')
let nameRef, descriptionRef, isOpenRef, dateRef, uploadsRef, parentRef, resourcesRef, notesRef

import ReactQuill from 'react-quill'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import alignTheme from './AlignTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import {GridList, GridTile} from 'material-ui/GridList'
import Close from 'material-ui/svg-icons/navigation/close'
import UploadForm from './Upload'
import UploadCard from './UploadCard'
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
      date: new Date().getTime(),
      notes: ''
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
    notesRef = fireRef.notesRef

    // Whenever our ref's value changes, set {value} on our state.
    // const listener = fireRef.on('value', snapshot =>
    //   this.setState({value: snapshot.val()}))

    // HEY ALL let's refactor to just listen to parent element
    const nameListener = nameRef.on('value', snapshot =>
      this.setState({ name: snapshot.val() || '' }))

    const descriptionListener = descriptionRef.on('value', snapshot => {
      this.setState({ description: snapshot.val() || '' })
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
      if (snapshot.val()) this.setState({ uploads: Object.entries(snapshot.val()) })
    })

    const notesListener = notesRef.on('value', snapshot => {
      if (snapshot.val()) this.setState({ notes: snapshot.val() })
    })

    // Set unsubscribe to be a function that detaches the listener.
    this.unsubscribe = () => {
      nameRef.off('value', nameListener)
      descriptionRef.off('value', descriptionListener)
      isOpenRef.off('value', isOpenListener)
      dateRef.off('value', dateListener)
      resourcesRef.off('value', resourcesListener)
      uploadsRef.off('value', uploadsListener)
      notesRef.off('value', notesListener)
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

  writeNotes = (event) => {
    notesRef.set(event)
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

  deleteMilestone = () => {
    let goalId = this.props.goalId
    let milestoneId = this.props.milestoneId
    this.unsubscribe()
    goalsRef.child(goalId).child('milestones').child(milestoneId).set(null)
    browserHistory.push('/')
  }

  render() {
    // Rendering form with material UI
    return (
      <div id='mockup-container'>
      <MuiThemeProvider muiTheme={getMuiTheme(alignTheme)}>
        <div className="container-fluid">
          <h1><span id='milestoneName'>{this.state.name}</span><span id='close-icon'><Close onTouchTap={() => browserHistory.push('/')} /></span></h1>
          <div className="row">
            <div className="col-xs-6">
              <h3>Milestone Information</h3>
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
                  multiLine={true}
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
                <DatePicker id='date' value={new Date(this.state.date)} onChange={this.writeDate} floatingLabelText={this.state.isOpen ? 'When will you achieve this milestone?' : 'When did you achieve this milestone?'} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <h3>Resources</h3>
              <ResourceForm goalRef={parentRef} milestoneRef={resourcesRef} milestoneId={this.props.milestoneId} />
              { this.state.resources && this.state.resources.map((resourceID, index) => {
                  return (
                    <div key={resourceID} className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <ResourceContainer resourceID={resourceID} />
                    </div>
                  )
                })
              }
            </div>
            <div className="col-xs-6" className='upload-container'>
              <h3>Uploads</h3>
              <UploadForm goalRef={parentRef} milestoneRef={uploadsRef} milestoneId={this.props.milestoneId} />
                { this.state.uploads && this.state.uploads.map((upload, index) => {
                  const uploadId = upload[0]
                  const uploadInfo = upload[1]
                  return (
                    <div key={index} className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <UploadCard key={index} uploadId={uploadId} url={uploadInfo.imageURL} goalRef={parentRef} milestoneRef={uploadsRef} milestoneId={this.props.milestoneId} />
                    </div>
                  )
                })
                }
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12">
              <h3>Notes</h3>
              <ReactQuill
                value={this.state.notes}
                onChange={this.writeNotes}
              />
            </div>
          </div>
        <div className="row">
          <div className="col-xs-6" id="bottom-buttons">
            <div id="button-container"><Link to={`/goal/${this.props.goalId}`}><RaisedButton label="Back to goal" primary={true} /></Link></div>
            <div><RaisedButton label="Delete this milestone?" secondary={true} onClick={this.deleteMilestone} /></div>
          </div>
        </div>
      </div>
      </MuiThemeProvider>
      </div>
    )
  }
}
