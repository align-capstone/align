import React from 'react'
import {Route} from 'react-router'

import {getGoalRefs} from 'APP/fire/refs'

import GoalForm from './GoalForm'

export default ({params: {id}}) => {
  // call goalRefs function with the current id to generate reference paths
  // to all the values for the current goal in firebase
  const goalRefs = getGoalRefs(id)
  return (
    <div>
      <GoalForm fireRef={goalRefs} id={id} />
    </div>
  )
}
