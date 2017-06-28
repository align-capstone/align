import React from 'react'
import {Route} from 'react-router'

import {getMilestoneRefs} from 'APP/fire/refs'

import MilestoneForm from './MilestoneForm'

export default ({params: {id, mid}}) => {
  const milestoneRefs = getMilestoneRefs(id, mid)
  return (
    <div>
      <MilestoneForm fireRef={milestoneRefs} />
    </div>
  )
}
