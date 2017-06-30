import React, {Component} from 'react'
import {Route} from 'react-router'

import {getResourceRefs} from 'APP/fire/refs'
let resourceRefs

import Resource from './Resource'

// this container will be a child of goal / milestone / check-in, so it receives resource IDs as props??
// in here, define the function that takes a resources object (keys are IDs) and returns db refs
// so, we'll pass in the object of IDs, map over the object, and call getResourceRefs with each key / ID

// export default class extends Component {
//   constructor(props) {
//     super()
//   }

//   componentDidMount() {
//     console.log('props in resources container??', this.props)
//     const id = this.props.resourceID
//     resourceRefs = getResourceRefs(id)
//     console.log('resourceRefs in resources container??', resourceRefs)
//   }

//   render() {
//     console.log('resourceRefs in render function: ', resourceRefs)
//     return (
//       <div>
//         <Resource fireRef={resourceRefs} />
//       </div>
//     )
//   }
// }

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
