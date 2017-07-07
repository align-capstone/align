import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Grid, Col } from 'react-bootstrap'

import firebase from 'APP/fire'
const db = firebase.database()
const auth = firebase.auth()
const usersRef = db.ref('users')
const goalsRef = db.ref('goals')
let nameRef, descriptionRef, isOpenRef, startRef, endRef, colorRef, milestonesRef, checkInsRef, resourcesRef, uploadsRef, notesRef
let newMilestonePath, newCheckInPath

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
import { CirclePicker } from 'react-color'
import { List, ListItem } from 'material-ui/List'
import Edit from 'material-ui/svg-icons/content/create'
import Add from 'material-ui/svg-icons/content/add'
import Close from 'material-ui/svg-icons/navigation/close'
import ResourceContainer from './ResourceContainer'
import ResourceCard from './ResourceCard'
import ResourceForm from './ResourceForm'
import UploadForm from './Upload'
import UploadCard from './UploadCard'

export default class extends React.Component {
  constructor(props) {
    super()
    this.state = {
      name: '',
      description: '',
      isOpen: true,
      startDate: new Date().getTime(),
      endDate: new Date().getTime(),
      color: '#000',
      milestones: [],
      checkIns: [],
      resources: [],
      notes: ''
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

    // Set up aliases for our Firebase references:
    // MPM adding goal ref to send to upload??
    nameRef = fireRef.nameRef
    descriptionRef = fireRef.descriptionRef
    isOpenRef = fireRef.isOpenRef
    startRef = fireRef.startRef
    endRef = fireRef.endRef
    colorRef = fireRef.colorRef
    milestonesRef = fireRef.milestonesRef
    checkInsRef = fireRef.checkInsRef
    resourcesRef = fireRef.resourcesRef
    uploadsRef = fireRef.uploadsRef
    notesRef = fireRef.notesRef

    // LISTENERS TO DATEBASE:
    // Whenever a ref's value changes in Firebase, set {value} on our state.

    const nameListener = nameRef.on('value', snapshot =>
      this.setState({ name: snapshot.val() || '' }))

    const descriptionListener = descriptionRef.on('value', snapshot => {
      this.setState({ description: snapshot.val() || '' })
    })

    const isOpenListener = isOpenRef.on('value', snapshot => {
      if (snapshot.val() === null) isOpenRef.set(true)
      this.setState({ isOpen: snapshot.val() })
    })

    const startDateListener = startRef.on('value', snapshot => {
      this.setState({ startDate: snapshot.val() })
      if (snapshot.val() === null) startRef.set(new Date().getTime())
    })

    const endDateListener = endRef.on('value', snapshot => {
      this.setState({ endDate: snapshot.val() })
      if (snapshot.val() === null) endRef.set(new Date().getTime())
    })

    const colorListener = colorRef.on('value', snapshot => {
      if (snapshot.val() === null) return this.setState({
        hex: '#bcbbb9',
        hsl: {
          a: 1,
          h: 39.99999999999962,
          l: 0.7313725490196079,
          s: 0.02189781021897823
        },
        hsv: {
          a: 1,
          h: 39.99999999999962,
          s: 0.01595744680851073,
          v: 0.7372549019607844
        },
        oldHue: 250,
        rgb: {
          a: 1,
          b: 185,
          g: 187,
          r: 188
        },
        source: 'hex'
      })
      this.setState({ color: snapshot.val() })
    })

    const milestonesListener = milestonesRef.on('value', snapshot => {
      if (snapshot.val()) this.setState({ milestones: Object.entries(snapshot.val()) })
    })

    const checkInsListener = checkInsRef.on('value', snapshot => {
      if (snapshot.val()) this.setState({ checkIns: Object.entries(snapshot.val()) })
    })

    const resourcesListener = resourcesRef.on('value', snapshot => {
      if (snapshot.val()) this.setState({ resources: Object.keys(snapshot.val()) })
      else this.setState({ resources: [] })
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
      startRef.off('value', startDateListener)
      endRef.off('value', endDateListener)
      colorRef.off('value', colorListener)
      milestonesRef.off('value', milestonesListener)
      checkInsRef.off('value', checkInsListener)
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
  // in the constructor. Incidentally, this means that write is always bound to this.

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

  writeStartDate = (event, date) => {
    startRef.set(date.getTime())
  }

  writeEndDate = (event, date) => {
    endRef.set(date.getTime())
  }

  handleColorChange = (color, event) => {
    colorRef.set(color)
  }

  createNewMilestone = () => {
    let newMilestoneRef = milestonesRef.push()
    let newMilestonePath = `/milestone/${this.props.id}/${newMilestoneRef.key}`
    browserHistory.push(newMilestonePath)
  }

  createNewCheckIn = () => {
    let newCheckInRef = checkInsRef.push()
    let newCheckInPath = `/checkin/${this.props.id}/${newCheckInRef.key}`
    browserHistory.push(newCheckInPath)
  }

  deleteGoal = () => {
    let goalId = this.props.id
    let userId = auth.currentUser.uid
    this.unsubscribe()

    // to avoid multiple writes to firebase:
    // make an object of data to delete and pass it to the top level
    let dataToDelete = {}
    dataToDelete[`/goals/${goalId}`] = null
    dataToDelete[`/users/${userId}/goals/${goalId}`] = null
    db.ref().update(dataToDelete, function (error) {
      if (error) {
        console.log('Error deleting data: ', error)
      }
    })
    browserHistory.push('/')
  }

  render() {
    const colorArray = ['#6CC2BD', '#5A809E', '#7C79A2', '#F57D7C', '#FFC1A6', '#ffd7a6', '#bcbbb9', '#9E898F', '#667762', '#35464D', '#386174', '#6B96C9']
    return (
      <div id='mockup-container'>
        <MuiThemeProvider muiTheme={getMuiTheme(alignTheme)}>
          <div className='container-fluid'>
            <div id='faux-modal-header'>
              <div className='row faux-header'>
                <div className='col-xs-12'>
                  <h1 style={{ color: this.state.color.hex }}><span id='goalName'>{this.state.name}</span><span id='close-icon'><Close onTouchTap={() => browserHistory.push('/')} /></span></h1>
                </div>
              </div>
            </div>
            <div id='faux-modal-body'>
              <div className='row'>
                <div className='col-xs-6'>
                  <h3 style={{ color: this.state.color.hex }}>Goal Information</h3>
                  <div className='form-group'>
                    <TextField
                      hintText='Your goal name'
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
                      floatingLabelText='Is this goal achieved?'
                      value={this.state.isOpen}
                      onChange={this.writeIsOpen}
                    >
                      <MenuItem value={false} id='isntOpen' primaryText='Yes!' />
                      <MenuItem value={true} id='isOpen' primaryText='Not yet...' />
                    </SelectField>
                  </div>
                  <div className='form-group'>
                    <DatePicker id='startDate' value={new Date(this.state.startDate)} onChange={this.writeStartDate} floatingLabelText='When will you start your goal?' />
                  </div>
                  <div className='form-group'>
                    <DatePicker id='endDate' value={new Date(this.state.endDate)} onChange={this.writeEndDate} floatingLabelText={this.state.isOpen ? 'When will you achieve this goal?' : 'When did you achieve this goal?'} />
                  </div>
                </div>
                <div className="col-xs-6">
                  <div>
                    <h3 style={{ color: this.state.color.hex }}>Choose Color</h3>
                    <CirclePicker colors={colorArray} onChange={this.handleColorChange} />
                  </div>
                  <div>
                    <h3 style={{ color: this.state.color.hex }}>Notes</h3>
                    <ReactQuill
                      value={this.state.notes}
                      onChange={this.writeNotes}
                      style={{ height: '20vh' }}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-xs-6'>
                  <h3 style={{ color: this.state.color.hex }}>Resources</h3>
                  <ResourceForm goalRef={resourcesRef} goal={this.props.id} />
                  <div >
                    {this.state.resources && this.state.resources.map((resourceId, index) => {
                      return (
                        <ResourceContainer key={resourceId} resourceId={resourceId} goalId={this.props.id} />
                      )
                    })
                    }
                  </div>
                </div>
                <div className='col-xs-6 upload-container'>
                  <h3 style={{ color: this.state.color.hex }}>Uploads</h3>
                  <UploadForm goalRef={uploadsRef} />
                  <div>
                    {this.state.uploads && this.state.uploads.map((upload, index) => {
                      const uploadId = upload[0]
                      const uploadInfo = upload[1]
                      return (
                        <UploadCard key={index} uploadId={uploadId} url={uploadInfo.imageURL} goalRef={uploadsRef} />
                      )
                    })
                    }
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-xs-6'>
                  <div>
                    <h3 style={{ color: this.state.color.hex }}>Milestones</h3>
                    <List>
                      {
                        this.state.milestones && this.state.milestones.map((milestone, index) => {
                          let milestonePath = `/milestone/${this.props.id}/${milestone[0]}`
                          return (
                            <ListItem key={index} primaryText={milestone[1].name} leftIcon={<Edit />} containerElement={<Link to={milestonePath} />} ></ListItem>
                          )
                        })
                      }
                      <ListItem leftIcon={<Add />} onTouchTap={this.createNewMilestone} >Add new</ListItem>
                    </List>
                  </div>
                </div>
                <div className='col-xs-6'>
                  <div>
                    <h3 style={{ color: this.state.color.hex }}>Check Ins</h3>
                    <List>
                      {
                        this.state.checkIns && this.state.checkIns.map((checkin, index) => {
                          let checkinPath = `/checkin/${this.props.id}/${checkin[0]}`
                          return (
                            <ListItem key={index} primaryText={checkin[1].name} leftIcon={<Edit />} containerElement={<Link to={checkinPath} />} ></ListItem>
                          )
                        })
                      }
                      <ListItem leftIcon={<Add />} onTouchTap={this.createNewCheckIn} >Add new</ListItem>
                    </List>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-xs-6' id='bottom-buttons'>
                  <div id="button-container"><RaisedButton label="Save Goal" primary={true} onClick={() => browserHistory.push('/')} /></div>
                  <div><RaisedButton label='Delete this goal?' secondary={true} onClick={this.deleteGoal} /></div>
                </div>
              </div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
