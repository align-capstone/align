import React from 'react'
import {Route} from 'react-router'

import {getCheckInRefs} from 'APP/fire/refs'

import CheckInForm from './CheckInForm'

export default ({params: {id, cid}}) => {
  // Generate the db refs for the check in that we want:
  const checkInRefs = getCheckInRefs(id, cid)
  return (
    <div>
      <CheckInForm fireRef={checkInRefs} goalId={id} checkInId={cid} />
    </div>
  )
}
