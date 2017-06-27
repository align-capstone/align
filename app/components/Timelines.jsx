import React, { Component } from 'react'
import firebase from 'APP/fire'
const db = firebase.database()
let goalsRef = db.ref('goals')

import SingleTimeline from './SingleTimeline'

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


/*

Input: array of goals
for each:
  pull out stat + end date

Needed output for each goal:
[{date: new Date(x), }, { }]

need helper function that makes a dates array

this is a container for eventual timeline component
that we pass the info for each timeline down to as props

*/


export default class extends Component {
  constructor(props) {
    super()
    this.state = {
      goals: []
    }
  }

  componentDidMount() {
    goalsRef.on("value", (snapshot) => {
      this.setState({goals: Object.entries(snapshot.val())})
    }, (errorObject) => {
      console.log("The read failed o no!!!!!!!! " + errorObject.code);
    })


  }

  render() {
    return (
      <div>
        {
          this.state.goals && this.state.goals.map((goal, index) => (
            <SingleTimeline key={index} goalData={goal} yAxis={index} />
          ))
        }
      </div>
    )
  }
}
