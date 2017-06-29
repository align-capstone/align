import React from 'react'
import { Link } from 'react-router'
let nameRef, descriptionRef, isOpenRef, startRef, endRef, colorRef, milestonesRef, checkInsRef

import uuidv1 from 'uuid/v1'
let newMilestonePath, newCheckInPath

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import { CirclePicker } from 'react-color'
import {List, ListItem} from 'material-ui/List'
import Edit from 'material-ui/svg-icons/content/create'
import Add from 'material-ui/svg-icons/content/add'

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
      checkIns: []
      // MPM initialize resources here??? resources: []
    }
  }

  componentDidMount() {
    // When the component mounts, start listening to the fireRef
    // we were given.
    this.listenTo(this.props.fireRef)
    newMilestonePath = `/milestone/${this.props.id}/${uuidv1()}`
    newCheckInPath = `/checkin/${this.props.id}/${uuidv1()}`
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
    nameRef = fireRef.nameRef
    descriptionRef = fireRef.descriptionRef
    isOpenRef = fireRef.isOpenRef
    startRef = fireRef.startRef
    endRef = fireRef.endRef
    colorRef = fireRef.colorRef
    milestonesRef = fireRef.milestonesRef
    checkInsRef = fireRef.checkInsRef

    // LISTENERS TO DATEBASE:
    // Whenever a ref's value changes in Firebase, set {value} on our state.

    const nameListener = nameRef.on('value', snapshot =>
      this.setState({ name: snapshot.val() }))

    const descriptionListener = descriptionRef.on('value', snapshot => {
      this.setState({ description: snapshot.val() })
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
      if (snapshot.val() === null) colorRef.set('#00f0f0')
      this.setState({ color: snapshot.val() })
    })

    const milestonesListener = milestonesRef.on('value', snapshot => {
      this.setState({ milestones: Object.entries(snapshot.val()) })
    })

    const checkInsListener = checkInsRef.on('value', snapshot => {
      this.setState({ checkIns: Object.entries(snapshot.val()) })
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

  writeStartDate = (event, date) => {
    startRef.set(date.getTime())
  }

  writeEndDate = (event, date) => {
    endRef.set(date.getTime())
  }

  handleColorChange = (color, event) => {
    colorRef.set(color)
  }

  render() {
    //color array, for color pallette
    const colorArray = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]
    // Rendering form with material UI
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <h1>Edit page for goal: <span id='goalName'>{this.state.name}</span></h1>
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
            <DatePicker id='startDate' value={new Date(this.state.startDate)} onChange={this.writeStartDate} floatingLabelText='When will you start working on your goal?' />
          </div>
          <div className='form-group'>
            <DatePicker id='endDate' value={new Date(this.state.endDate)} onChange={this.writeEndDate} floatingLabelText='When do you plan to achieve your goal?' />
          </div>
          <div>
            <h3>Choose Color:</h3>
            <CirclePicker colors={colorArray} onChange={this.handleColorChange} />
          </div>
          <br />
          <div>
            <h3>Milestones:</h3>
            <List>
              {
                this.state.milestones && this.state.milestones.map((milestone, index) => {
                  let milestonePath = `/milestone/${this.props.id}/${milestone[0]}`
                  return (
                    <ListItem key={index} primaryText={milestone[1].name} leftIcon={<Edit />} containerElement={<Link to={milestonePath} />} ></ListItem>
                  )
                })
              }
              <ListItem leftIcon={<Add />} containerElement={<Link to={newMilestonePath} />} >Add new</ListItem>
            </List>
          </div>
          <div>
            <h3>Check Ins:</h3>
            <List>
              {
                this.state.checkIns && this.state.checkIns.map((checkin, index) => {
                  let checkinPath = `/checkin/${this.props.id}/${checkin[0]}`
                  return (
                    <ListItem key={index} primaryText={checkin[1].name} leftIcon={<Edit />} containerElement={<Link to={checkinPath} />} ></ListItem>
                  )
                })
              }
              <ListItem leftIcon={<Add />} containerElement={<Link to={newCheckInPath} />} >Add new</ListItem>
            </List>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
