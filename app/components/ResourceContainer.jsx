import React, {Component} from 'react'
import {Route} from 'react-router'

import {getResourceRefs} from 'APP/fire/refs'
let resourceRefs

import ResourceCard from './ResourceCard'

export default function(props) {
  const id = props.resourceID
  const resourceRefs = getResourceRefs(id)
  return (
    <ResourceCard fireRef={resourceRefs} id={id} />
  )
}
