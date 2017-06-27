import React, { Component } from 'react'
import firebase from 'APP/fire'
const db = firebase.database()
let goalsRef = db.ref('goals')

// ignore for now
// import {getGoalRefs} from 'APP/fire/refs'
// const goalRefs = getGoalRefs(7)
// hard coded for now; eventually will need to get all goals by current user ID

// go back and add milestones, click handlers, etc.
// "data" ??
// dates: we're storing dates in Firebase as timestamps (#)
// to get it back into date format, do new Date(timestamp)

  // call goalRefs function with the current id to generate reference paths
  // to get all the values for the current goal in firebase


export default class extends Component {
  constructor(props) {
    super()
    this.state = {
      goals: []
    }
  }

  componentDidMount() {
    goalsRef.on("value", function(snapshot) {
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })
  }

  render() {
    // Rendering form with material UI - still need to hook up start/end date selectors
    return (
      <div> <h3>???</h3> </div>
    )
  }
}
