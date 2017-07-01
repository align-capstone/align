import React, {Component} from 'react'
import {Route} from 'react-router'

import {getResourceRefs} from 'APP/fire/refs'
let resourceRefs

import Resource from './Resource'

export default function(props) {
  const id = props.resourceID
  const resourceRefs = getResourceRefs(id)
  return (
    <Resource fireRef={resourceRefs} id={id} />
  )
}
