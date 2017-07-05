import React, {Component} from 'react'
import {Route} from 'react-router'

import {getResourceRefs} from 'APP/fire/refs'
let resourceRefs

import ResourceCard from './ResourceCard'

export default function(props) {
  const id = props.resourceId
  const goalId = props.goalId
  const resourceRefs = getResourceRefs(id, goalId)
  return (
    <ResourceCard fireRef={resourceRefs} id={id} goalId={props.goalId} />
  )
}
