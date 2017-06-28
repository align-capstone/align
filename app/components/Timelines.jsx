import React, { Component } from 'react'
import firebase from 'APP/fire'
const db = firebase.database()
let goalsRef = db.ref('goals')

import { VictoryAxis, VictoryChart, VictoryLine, VictoryBrushContainer, VictoryZoomContainer, VictoryScatter } from 'victory'

// ignore for now; need to update:
// import {getGoalRefs} from 'APP/fire/refs'
// call goalRefs function with the current id to generate reference paths
// to get all the values for the current goal in firebase

// go back and add milestones, click handlers, etc.
// eventually, we'll sort goals array by priority / activity level, so displaying by index will have more significance

export default class extends Component {
  constructor(props) {
    super()
    this.state = {
      goals: []
    }
  }

  handleZoom(domain) {
    this.setState({selectedDomain: domain})
  }

  handleBrush(domain) {
    this.setState({zoomDomain: domain})
  }

  componentDidMount() {
    goalsRef.on('value', (snapshot) => {
      // MPM: just realized Object.entries is "experimental", so it might not work in all browsers
      // do we want to go back to just using Object.keys?
      this.setState({goals: Object.entries(snapshot.val())})
    })
  }

  // MPM: add componentWillUnmount

  render() {
    const chartStyle = { parent: {minWidth: '50%', maxWidth: '80%', marginLeft: '10%', cursor: 'pointer'} }
    return (
      <div>
        <VictoryChart width={600} height={400} scale={{x: 'time'}} style={chartStyle}
          domain={{
            // MPM: eventually, manipulate this time span using moment library
            // for now, though, just starting the view at the beginning of 2017
            x: [new Date(2017, 0, 1), Date.now()],
            y: [0, this.state.goals.length+1]
          }}
          // MPM: add domainPadding?
          containerComponent={
            <VictoryZoomContainer
              dimension='x'
              zoomDomain={this.state.zoomDomain}
              onDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          {
            this.state.goals && this.state.goals.map((goal, index) => {
              // get goal info out of goal array: index 0 is goal id and index 1 is object with all other data
              let goalInfo = goal[1]
              return (
                <VictoryLine
                  key={index}
                  style={{
                    data: {stroke: goalInfo.color.hex}
                  }}
                  events={[{
                    target: 'data',
                    eventHandlers: {
                      onClick: (event) => {
                        console.log('clicked line #', index)
                      }
                    }
                  }]}
                  data={[
                    {a: new Date(goalInfo.startDate), b: index+1},
                    {a: new Date(goalInfo.endDate), b: index+1}
                  ]}
                  x='a'
                  y='b'
                />
              )
            })
          }{
            this.state.goals && this.state.goals.map((goal, index) => {
              let goalInfo = goal[1]
              return (
                <VictoryScatter
                  key={index}
                  style={{
                    data: {
                      stroke: goalInfo.color.hex,
                      strokeWidth: 3,
                      fill: 'white'
                    }
                    // MPM add labels
                  }}
                  events={[{
                    target: 'data',
                    eventHandlers: {
                      onClick: (event) => {
                        console.log('clicked the data point!')
                      }
                    }
                  }]}
                  data={[
                    {a: new Date(goalInfo.startDate), b: index+1, symbol: 'circle', fill: goalInfo.color.hex},
                    {a: new Date(goalInfo.endDate), b: index+1, symbol: 'circle', fill: goalInfo.color.hex}
                  ]}
                  x='a'
                  y='b'
                />
              )
            })
          }
        </VictoryChart>

        <VictoryChart
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={600} height={50} scale={{x: 'time'}} style={chartStyle}
            containerComponent={
              <VictoryBrushContainer
                dimension='x'
                selectedDomain={this.state.selectedDomain}
                onDomainChange={this.handleBrush.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickFormat={(x) => new Date(x).getFullYear()}
            />
            {
              this.state.goals && this.state.goals.map((goal, index) => {
                let goalInfo = goal[1]
                return (
                  <VictoryLine
                    key={index}
                    style={{
                      data: {stroke: goalInfo.color.hex}
                    }}
                    data={[
                      {a: new Date(goalInfo.startDate), b: index+1},
                      {a: new Date(goalInfo.endDate), b: index+1}
                    ]}
                    x='a'
                    y='b'
                  />
                )
              })
            }
        </VictoryChart>
      </div>
    )
  }
}
