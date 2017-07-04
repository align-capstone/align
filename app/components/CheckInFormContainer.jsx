import React from 'react'
import {Route} from 'react-router'

import {getCheckInRefs} from 'APP/fire/refs'

import CheckInForm from './CheckInForm'

export default (props) => {
  // Generate the db refs for the check in that we want:
  const checkInRefs = getCheckInRefs(props.id, props.cid)
  return (
    <div>
      <CheckInForm fireRef={checkInRefs} goalId={props.id} checkInId={props.cid} />
    </div>
  )
}
