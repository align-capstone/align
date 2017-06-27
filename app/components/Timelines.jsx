import React, { Component } from 'react'
import firebase from 'firebase'

import {getGoalRefs} from 'APP/fire/refs'

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
      startDate: '',
      endDate: '',
      milestones: []
    }
  }
}
