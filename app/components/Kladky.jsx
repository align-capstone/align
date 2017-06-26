import React from 'react'
import firebase from 'APP/fire'
const db = firebase.database()
let nameRef, descriptionRef, isOpenRef

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
    return (
      <div>
        <div className="form-group">
          <label>Name:</label>
          <input
            id='name'
            rows={10}
            cols={120}
            value={this.state.name}
            onChange={this.write}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            id='description'
            rows={10}
            cols={120}
            value={this.state.description}
            onChange={this.write}
          />
        </div>
        <div className="form-group">
          <label>Is this goal achieved?</label>
          <select
            id='isOpen'
            type='text'
            onChange={this.write}
            value={this.state.isOpen}
            >
            <option value='false'>Yes!</option>
            <option value='true'>Not yet...</option>
          </select>
        </div>
      </div>
    )
  }
}
