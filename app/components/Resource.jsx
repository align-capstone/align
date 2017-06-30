// this is a presentational component that we'll call for each resource
// basically just a render function that will return the resource 'card'

// a resource card should contain: title, thumbnail photo, and a description at the bottom, and it should link somewhere

import React from 'react'
import { Link } from 'react-router'

export default function Resource(props) {
  console.log(props)
  return (
    <div>
      <h2>lol halp</h2>
      <h3>{props.titleRef}</h3>
    </div>
  )
}
