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
      resources: [
        // 2: {
        //   title: 'Get Closer to Doing a Handstand in 12 Minutes',
        //   url: 'http://vitals.lifehacker.com/get-closer-to-doing-a-handstand-in-12-minutes-1796377028',
        //   image: 'https://i.kinja-img.com/gawker-media/image/upload/…_center,h_450,q_80,w_800/ojni1ghqt64kl2ncry5z.jpg'
        // }
      ],
      // goalResources: {},
      // milestoneResources: {},
      // checkinResources: {}
    }
  }

  // getResourceIDs() {
  //   // here define the thing
  //   // get resource IDs passed down as props from the parent element
  //   // push them to resource array and return it??
  // }

  componentDidMount() {
    console.log('props in resources container??', this.props)
    let resources = []
    let resourcesFromParent = this.props.resources
    for (var id in resourcesFromParent) {
      resources.push(id)
    }
    this.setState({resources: resources})

    // here we have resources object as props
    // call getResourceIDs on that object
    // and set state with it

    // invoke getResourceIDs here??? then set them on state
    // this.setState({resources: resources})
  }

  render() {
    console.log('state from resources container???', this.state)
    return (
      <div>
        {
          this.state.resources && this.state.resources.map((resource, index) => {
            const id = resource.id
            const resourceRefs = getResourceRefs(id)
            console.log('id???', id)
            return (
              <Resource fireRef={resourceRefs} id={id} />
            )
          })
        }
      </div>
    )
  }
}
