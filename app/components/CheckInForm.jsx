/*
WHERE WE LEFT OFF:::
(1) 'Is this goal achieved?'/isOpen -- getting event.target to work in 'write' function
(2) need to do end-goal like start-goal to get timestamp into firebase
*/
import React from 'react'
let nameRef, descriptionRef, isOpenRef, dateRef

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'

export default class extends React.Component {
  constructor(props) {
    super()
    this.state = {
      name: '',
      description: '',
      isOpen: true,
      date: 0
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

    // Whenever our ref's value changes, set {value} on our state.
    // const listener = fireRef.on('value', snapshot =>
    //   this.setState({value: snapshot.val()}))

    const nameListener = nameRef.on('value', snapshot =>
      this.setState({ name: snapshot.val() }))

    const descriptionListener = descriptionRef.on('value', snapshot => {
      this.setState({ description: snapshot.val() })
    })

    const isOpenListener = isOpenRef.on('value', snapshot => {
      if (snapshot.val() === null) isOpenRef.set(true)
      this.setState({ isOpen: snapshot.val() })
    })

    const dateListener = dateRef.on('value', snapshot => {
      this.setState({ date: snapshot.val() })
      console.log("New date new state: ", new Date(this.state.date))
    })

    // Set unsubscribe to be a function that detaches the listener.
    this.unsubscribe = () => {
      nameRef.off('value', nameListener)
      descriptionRef.off('value', descriptionListener)
      isOpenRef.off('value', isOpenListener)
      dateRef.off('value', dateListener)
    }
  }

  // Write is defined using the class property syntax.
  // This is roughly equivalent to saying,
  //
  //    this.write = event => (etc...)
  //
  // in the constructor. Incidentally, this means that write
  // is always bound to this.
  write = (event, id) => {
    if (event.target.id === 'name') {
      nameRef.set(event.target.value)
    }
    if (event.target.id === 'description') {
      descriptionRef.set(event.target.value)
    }
    // for 'isOpen', we're setting it to false if the user says they already achieved it, or true if they say they haven't
    if (id === 0 ) {
      isOpenRef.set(false)
    }
    if (id === 1 ) {
      isOpenRef.set(true)
    }
  }

  writeDate = (event, date) => {
    console.log("Looks like you picked: ", date)
    dateRef.set(date.getTime())
  }

  render() {
    // Rendering form with material UI
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <h1>Edit page for check in: <span id='checkInName'>{this.state.name}</span></h1>
          <div className='form-group'>
            <TextField
              hintText='Your check in name'
              floatingLabelText='Name'
              value={this.state.name}
              onChange={this.write}
              id='name'
            />
          </div>
          <div className='form-group'>
            <TextField
              hintText='What do you want to do?'
              floatingLabelText='Description'
              value={this.state.description}
              onChange={this.write}
              id='description'
            />
          </div>
          <div className='form-group'>
            <SelectField
              floatingLabelText='Is this check in achieved?'
              value={this.state.isOpen}
              onChange={this.write}
            >
              <MenuItem value={false} id='isntOpen' primaryText='Yes!' />
              <MenuItem value={true} id='isOpen' primaryText='Not yet...' />
            </SelectField>
          </div>
          <div className='form-group'>
            <DatePicker id='date' value={new Date(this.state.date)} onChange={this.writeDate} floatingLabelText='When do you hope to accomplish this check in?' />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
