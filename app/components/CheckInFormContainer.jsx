import React from 'react'
import {Route} from 'react-router'

import {getCheckInRefs} from 'APP/fire/refs'

import CheckInForm from './CheckInForm'

export default ({params: {id, cid}}) => {
  const checkInRefs = getCheckInRefs(id, cid)
  return (
    <div>
      <CheckInForm fireRef={checkInRefs} />
    </div>
  )
}
