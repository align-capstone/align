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
    goalsRef.on("value", (snapshot) => {
      this.setState({goals: Object.entries(snapshot.val())})
    }, (errorObject) => {
      console.log("The read failed o no!!!!!!!! " + errorObject.code);
    })


  }
/* Unsubscribing in a ComponentWillMount is best practice, so do it!*/
/* Consider modularizing into smaller render functions. Check out Moment library for time -Ashi */
  render() {
    const chartStyle = { parent: {minWidth: '50%', maxWidth: '80%', marginLeft: '10%', cursor: 'pointer'} }
    return (
      <div>
        <VictoryChart width={600} height={400} scale={{x: 'time'}} style={chartStyle}
          domain={{y: [0, this.state.goals.length+1]}}
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
              //set up var to get info out of goal array - index 1 is id and index 2 is all other data
              let goalInfo = goal[1]
              return (
                <VictoryLine
                  key={index}
                  style={{
                    data: {stroke: goalInfo.color}
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
          }{
            this.state.goals && this.state.goals.map((goal, index) => {
              let goalInfo = goal[1]
              return (
                <VictoryScatter
                  key={index}
                  style={{
                    data: { stroke: goalInfo.color, strokeWidth: 3, fill: 'white' }
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
        <VictoryChart
            padding={{top: 0, left: 50, right: 50, bottom: 30}}
            width={600} height={50} scale={{x: 'time'}}
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
                //set up var to get info out of goal array - index 1 is id and index 2 is all other data
                let goalInfo = goal[1]
                return (
                  <VictoryLine
                    key={index}
                    style={{
                      data: {stroke: goalInfo.color}
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
