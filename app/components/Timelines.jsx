import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()
const auth = firebase.auth()
let goalsRef = db.ref('goals')
let usersRef = db.ref('users')
let currentUserGoalsRef, goalsListener

import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryBrushContainer, VictoryZoomContainer, VictoryScatter, VictoryTooltip } from 'victory'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

// eventually, we'll sort goals array by priority / activity level, so displaying by index will have more significance

export default class extends Component {
  constructor(props) {
    super()
    this.state = {
      menuOpen: false,
      goals: [], // the actual goals that happen to belong to the user
      openGoal: {}
    }
  }


  // VICTORY FUNCTIONS:

  getScatterData(goal, index, goalId) {

    var data = []
    // push start and end dates to data array
    // maybe make end date of completed goals into a star??
    data.push({ x: new Date(goal.startDate), key: `/goal/${goalId}`, y: index, label: `start date: \n ${new Date(goal.startDate).toDateString()}`, symbol: 'circle', fill: goal.color.hex })
    data.push({ x: new Date(goal.endDate), key: `/goal/${goalId}`, y: index, label: 'end date: \n' + new Date(goal.endDate).toDateString(), symbol: 'circle', fill: goal.color.hex })
    // then iterate over the milestones object and push each date to the array
    if (goal.milestones) {
      for (var id in goal.milestones) {
        var milestone = goal.milestones[id]
        data.push({ x: new Date(milestone.displayDate), key: `/milestone/${goalId}/${id}`, y: index, label: milestone.name, symbol: 'square', fill: 'white' })
      }
    }
    if (goal.checkIns) {
      for (var id in goal.checkIns) {
        var checkin = goal.checkIns[id]
        data.push({ x: new Date(checkin.displayDate), key: `/checkin/${goalId}/${id}`, y: index, label: checkin.name, symbol: 'diamond', fill: 'white' })

      }
    }
    return data
  }

  handleZoom(domain) {
    this.setState({ selectedDomain: domain })
  }

  handleBrush(domain) {
    this.setState({ zoomDomain: domain })
  }

  // MUI FUNCTIONS:

  handleLineTap = (event, goal) => {
    // This prevents ghost click.
    event.preventDefault()
    console.log("in handleLineTap!!!")
    console.log("what is goalId???", goal[0])
    console.log("what is goalInfo?? ", goal[1])
    this.setState({
      menuOpen: true,
      anchorEl: event.currentTarget,
      openGoal: goal
    })
  }

  handleRequestClose = () => {
    this.setState({
      menuOpen: false,
    })
  }

  viewCurrentTimeline = () => {
    event.preventDefault()
    console.log('what is openGoal on state???', this.state.openGoal)
    let openGoalUrl = `/goal/${this.state.openGoal[0]}`
    browserHistory.push(openGoalUrl)
  }

  addMilestoneToCurrentTimeline = () => {
    event.preventDefault()
    let currentGoalId = this.state.openGoal[0]
    let newMilestoneRef = goalsRef.child(currentGoalId).child('milestones').push()
    let newMilestonePath = `/milestone/${this.state.openGoal[0]}/${newMilestoneRef.key}`
    browserHistory.push(newMilestonePath)
  }

  addCheckinToCurrentTimeline = () => {
    event.preventDefault()
    let currentGoalId = this.state.openGoal[0]
    let newCheckinRef = goalsRef.child(currentGoalId).child('checkIns').push()
    let newCheckinPath = `/checkin/${this.state.openGoal[0]}/${newCheckinRef.key}`
    browserHistory.push(newCheckinPath)
  }

  // FIREBASE FUNCTIONS:

  createNewGoal = (event) => {
    event.preventDefault()
    // check to see if the index of the menu item is the index of the add goal item aka 0
    let newGoalRef = goalsRef.push()
    let newGoalId = newGoalRef.key
    let newGoalPath = `/goal/${newGoalId}`
    let newUserGoalRelation = currentUserGoalsRef.child(newGoalId).set(true) //takes ID of the new Goal, and adds it as a key: true in user's goal object
    browserHistory.push(newGoalPath)
  }

  componentDidMount() {
    this.unsubscribeAuth = auth.onAuthStateChanged(user => {
      if (user) {
        const userId = user.uid
        currentUserGoalsRef = usersRef.child(userId).child('goals')
        this.listenTo(currentUserGoalsRef)
      }
    })
  }

  componentWillUnmount() {
    // When we unmount, stop listening.
    this.unsubscribe()
    this.unsubscribeAuth()
  }

  componentWillReceiveProps(incoming, outgoing) {
    // When the props sent to us by our parent component change,
    // start listening to the new firebase reference.
    this.listenTo(incoming.fireRef)
  }

  listenTo(fireRef) {
    if (this.unsubscribe) this.unsubscribe()

    goalsListener = fireRef.on('value', (snapshot) => {
      let userGoalIds = Object.keys(snapshot.val())
      let userGoals = {}
      userGoalIds.map(goalId => {
        goalsRef.child(goalId).on('value', (goalSnapshot) => {
          userGoals[goalId] = goalSnapshot.val()
          this.setState({goals: Object.entries(userGoals)})
        })
      })
    })

    // Set unsubscribe to be a function that detaches the listener.
    this.unsubscribe = () => {
      fireRef.off('value', goalsListener)
    }
  }

  render() {
    const chartStyle = { parent: { minWidth: '50%', maxWidth: '80%', marginLeft: '10%', cursor: 'pointer' } }
    return (
      <div>
        <VictoryChart width={600} height={400} scale={{ x: 'time' }} style={chartStyle}
          domain={{
            // MPM: eventually, manipulate this time span using moment library
            // for now, though, just start the view at the beginning of 2017??
            // x: [new Date(2017, 0, 1), Date.now()],
            y: [-1, this.state.goals.length]
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
              let goalId = goal[0]
              return (
                <VictoryLine
                  key={index}
                  style={{
                    data: {
                      stroke: goalInfo.color.hex,
                      strokeWidth: 4,
                    }
                  }}
                  events={[{
                    target: 'data',
                    eventHandlers: {
                      onClick: (event) => {this.handleLineTap(event, goal)}
                        // console.log('clicked line #', index, ", with ID ", goalId)
                        // console.log("what is goalInfo?? ", goalInfo)
                    }
                  }]}
                  data={[
                    { x: new Date(goalInfo.startDate), y: index },
                    { x: new Date(goalInfo.endDate), y: index }
                  ]}
                />
              )
            })
          }{
            this.state.goals && this.state.goals.map((goal, index) => {
              let goalInfo = goal[1]
              let goalId = goal[0]
              return (
                <VictoryScatter
                  key={index}
                  style={{
                    data: {
                      stroke: goalInfo.color.hex,
                      strokeWidth: 3,
                      fill: 'white'
                    }
                  }}
                  events={[{
                    target: 'data',
                    eventHandlers: {
                      onClick: (event, props) => {
                        let goalPath = props.data[props.index].key
                        browserHistory.push(goalPath)
                      }
                    }
                  }]}
                  data={this.getScatterData(goalInfo, index, goalId)}
                  labelComponent={<VictoryTooltip />}
                />
              )
            })
          }
        </VictoryChart>

        <VictoryChart
          // eventually, we want this size to be responsive / relative to # of goals?
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          width={600} height={50} scale={{ x: 'time' }} style={chartStyle}
          domain={{ y: [-1, this.state.goals.length] }}
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
                    { x: new Date(goalInfo.startDate), y: index },
                    { x: new Date(goalInfo.endDate), y: index }
                  ]}
                />
              )
            })
          }
        </VictoryChart>
        <FloatingActionButton secondary={true} onTouchTap={this.createNewGoal} style={{position: 'fixed', top: '87%', right: '5%'}} >
          <ContentAdd />
        </FloatingActionButton>
        <Popover
          open={this.state.menuOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}>
          <Menu>
            <MenuItem primaryText='Add check in' onTouchTap={this.addCheckinToCurrentTimeline} />
            <MenuItem primaryText='Add milestone' onTouchTap={this.addMilestoneToCurrentTimeline}/>
            <MenuItem primaryText='View timeline overview' onTouchTap={this.viewCurrentTimeline}/>
          </Menu>
        </Popover>
      </div>

    )
  }
}
