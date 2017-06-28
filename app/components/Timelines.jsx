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

  // MPM adding this helper function ugh I hate everything
  getScatterData(goal, index) {
    var data = []
    console.log('in getScatterData, getting goal info and index:', index, goal.name)
    // push start and end dates to data array
    // maybe make end date of completed goals into a star??
    data.push({x: new Date(goal.startDate), y: index, symbol: 'circle', fill: goal.color.hex})
    data.push({x: new Date(goal.endDate), y: index, symbol: 'circle', fill: goal.color.hex})
    // then iterate over the milestones object and push each date to the array
    if (goal.milestones) {
      // console.log('ugh idk milestones?', goal.milestones)
      for (var id in goal.milestones) {
        // console.log(goal.milestones[id].name)
        var milestone = goal.milestones[id]
        data.push({x: new Date(milestone.displayDate), y: index, symbol: 'square', fill: 'white'})
      }
    }
    return data
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
      // do we want to go back to just using Object.keys or a for-in loop?
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
            // for now, though, just start the view at the beginning of 2017??
            // x: [new Date(2017, 0, 1), Date.now()],
            y: [-1, this.state.goals.length]
          }}
          containerComponent={
            <VictoryZoomContainer
              dimension='x'
              zoomDomain={this.state.zoomDomain}
              onDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryAxis
              style={{
                axis: {
                  stroke: 'none'
                },
                tickLabels: {
                  angle: -45
                }
              }}
            />
          {
            this.state.goals && this.state.goals.map((goal, index) => {
              // get goal info out of goal array: index 0 is goal id and index 1 is object with all other data
              let goalInfo = goal[1]
              return (
                <VictoryLine
                  key={index}
                  style={{
                    data: {
                      stroke: goalInfo.color.hex,
                      strokeWidth: 4
                    }
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
                    {x: new Date(goalInfo.startDate), y: index},
                    {x: new Date(goalInfo.endDate), y: index}
                  ]}
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
                  data={this.getScatterData(goalInfo, index)}
                />
              )
            })
          }
        </VictoryChart>

        <VictoryChart
            // eventually, we want this size to be responsive / relative to # of goals?
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={600} height={50} scale={{x: 'time'}} style={chartStyle}
            domain={{y: [-1, this.state.goals.length]}}
            containerComponent={
              <VictoryBrushContainer
                dimension='x'
                selectedDomain={this.state.selectedDomain}
                onDomainChange={this.handleBrush.bind(this)}
              />
            }
          >
            <VictoryAxis
              // tickFormat={(x) => new Date(x).getFullYear()}
              tickValues={[]}
              style={{
                axis: {
                  stroke: 'none'
                }
              }}
            />
            {
              this.state.goals && this.state.goals.map((goal, index) => {
                let goalInfo = goal[1]
                return (
                  <VictoryLine
                    key={index}
                    style={{
                      data: {
                        stroke: goalInfo.color.hex,
                        strokeWidth: 3
                      }
                    }}
                    data={[
                      {x: new Date(goalInfo.startDate), y: index},
                      {x: new Date(goalInfo.endDate), y: index}
                    ]}
                  />
                )
              })
            }
        </VictoryChart>
      </div>
    )
  }
}
