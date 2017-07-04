import React from 'react'
import {Route} from 'react-router'

import {getMilestoneRefs} from 'APP/fire/refs'

import MilestoneForm from './MilestoneForm'

export default (props) => {
  const milestoneRefs = getMilestoneRefs(props.id, props.mid)
  return (
    <div>
      <MilestoneForm fireRef={milestoneRefs} goalId={props.id} milestoneId={props.mid} />
    </div>
  )
}
