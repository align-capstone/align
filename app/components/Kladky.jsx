/*QUESTION FOR KLADKY:
Is the flow here that we're writing to DB, and then the state is getting its value from DB?
(that's what i'm seeing, based on my understanding of lines 42-49);
OR are we setting state, and then state syncs to DB?
*/

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

    nameRef = db.ref('goals').child(this.props.id).child('name')
    descriptionRef = db.ref('goals').child(this.props.id).child('description')
    isOpenRef = db.ref('goals').child(this.props.id).child('isOpen')

    // Whenever our ref's value changes, set {value} on our state.
    // const listener = fireRef.on('value', snapshot =>
    //   this.setState({value: snapshot.val()}))

    const nameListener = nameRef.on('value', snapshot =>
      this.setState({ name: snapshot.val() }))

    const descriptionListener = descriptionRef.on('value', snapshot => {
      this.setState({ description: snapshot.val() })
      console.log("CHECK OUT THE STATE AFTER DESCRIPTION EDITING: ", this.state)
    })

    const isOpenListener = isOpenRef.on('value', snapshot => {
      this.setState({ isOpen: snapshot.val() })
      console.log("SETTING STATE OF ISOPEN. NEW STATE: ", this.state.isOpen)
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
      if (event.target.value === "Yes!") isOpenRef.set(false)
      else isOpenRef.set(true)
    }
  }

  render() {
    return (
      <div>
        <div>
          <label>Name:</label>
          <input
            id="name"
            rows={10}
            cols={120}
            value={this.state.name}
            onChange={this.write}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            id="description"
            rows={10}
            cols={120}
            value={this.state.description}
            onChange={this.write}
          />
        </div>
        <div>
          <label>Achieved?</label>
          <select id="isOpen" type="text" onChange={this.write}> {/* I was going to put value={this.state.isOpen}, but isOpen is a true/false, so it didn't really work*/}
            <option></option>
            <option>Yes!</option>
            <option>Not Yet</option>
          </select>
        </div>
      </div>
    )
  }
}