import React, {Component} from 'react'
import {Route} from 'react-router'

import {getResourceRefs} from 'APP/fire/refs'
let resourceRefs

import Resource from './Resource'

export default function(props) {
  console.log(props)
  const id = props.resourceID
  const resourceRefs = getResourceRefs(id)
  return (
    <div>
      <Resource fireRef={resourceRefs} id={id} />
    </div>
  )
}
