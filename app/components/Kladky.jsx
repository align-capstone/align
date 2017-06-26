import React from 'react'
let nameRef, descriptionRef, isOpenRef

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

    // Set unsubscribe to be a function that detaches the listener.
    this.unsubscribe = () => {
      nameRef.off('value', nameListener)
      descriptionRef.off('value', descriptionListener)
      isOpenRef.off('value', isOpenListener)
    }
  }

  // Write is defined using the class property syntax.
  // This is roughly equivalent to saying,
  //
  //    this.write = event => (etc...)
  //
  // in the constructor. Incidentally, this means that write
  // is always bound to this.
  write = event => {
    if (event.target.id === 'name') {
      nameRef.set(event.target.value)
    }
    if (event.target.id === 'description') {
      descriptionRef.set(event.target.value)
    }
    // for 'isOpen', we're setting it to false if the user says they already achieved it, or true if they say they haven't
    if (event.target.id === 'isOpen') {
      if (event.target.value === 'false') isOpenRef.set(false)
      else isOpenRef.set(true)
    }
  }

  render() {
    // Rendering form with material UI - still need to hook up start/end date selectors
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <h1>Edit page for goal: <span id='goalName'>{this.state.name}</span></h1>
          <div className='form-group'>
            <TextField
              hintText='Your goal name'
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
              floatingLabelText='Is this goal achieved?'
              value={this.state.isOpen}
              onChange={this.write}
              id='isOpen'
            >
              <MenuItem value={false} primaryText='Yes!' />
              <MenuItem value={true} primaryText='Not yet...' />
            </SelectField>
          </div>
          <div className='form-group'>
            <DatePicker floatingLabelText='When will you start working on your goal?' />
          </div>
          <div className='form-group'>
            <DatePicker floatingLabelText='When do you plan to achieve your goal?' />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
