import React, {Component} from 'react'
import {Route} from 'react-router'

import {getResourceRefs} from 'APP/fire/refs'

import Resource from './Resource'

// this container will be a child of goal / milestone / check-in, so it receives resource IDs as props??
// in here, define the function that takes a resources object (keys are IDs) and returns db refs
// so, we'll pass in the object of IDs, map over the object, and call getResourceRefs with each key / ID

export default class extends Component {
  constructor(props) {
    super()
    this.state = {
      resources: []
      // title: '',
      // url: '',
      // thumbnail: '',
      // description: ''
    }
  }

  // getResourceIDs() {
  //   // here define the thing
  //   // get resource IDs from the resources object on goal, milestone, and check-in
  //   // push them to resource array and return it??
  // }

  componentDidMount() {
    let resources = []
    let resourcesFromProps = this.props.resources
    for (var id in resourcesFromProps) {
      resources.push[id]
    }
    this.setState({resources: resources})
    // here we have resources object as props
    // call getResourceIDs on that object
    // and set state with it

    // invoke getResourceIDs here??? then set them on state
    // this.setState({resources: resources})
  }

  render() {
    return (
      <div>
        {
          this.state.resources && this.state.resources.map((resource, index) => {
            const id = resource.id
            const resourceRefs = getResourceRefs(id)
            return (
              <Resource fireRef={resourceRefs} id={id} />
            )
          })
        }
      </div>
    )
  }
}
