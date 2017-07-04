import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()
const auth = firebase.auth()
let goalsRef = db.ref('goals')
let usersRef = db.ref('users')
let currentUserGoalsRef, goalsListener
let goalRefs = {}

import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryBrushContainer, VictoryZoomContainer, VictoryScatter, VictoryTooltip } from 'victory'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import Empty from './Empty'

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
    var endSymbol = this.chooseEndSymbol(goal)

    // push start and end dates to data array
    data.push({ x: new Date(goal.startDate), key: `/goal/${goalId}`, y: index, label: `${goal.name} \n start date: \n ${new Date(goal.startDate).toDateString()}`, symbol: 'circle', strokeWidth: 7, fill: goal.color.hex })
    data.push({ x: new Date(goal.endDate), key: `/goal/${goalId}`, y: index, label: `${goal.name} \n end date: \n ${new Date(goal.endDate).toDateString()}`, symbol: endSymbol, strokeWidth: 7, fill: goal.color.hex })
    // then iterate over the milestones object and push each date to the array
    if (goal.milestones) {
      for (var id in goal.milestones) {
        var milestone = goal.milestones[id]
        var milestoneFill = this.chooseMilestoneFill(goal, milestone)
        data.push({ x: new Date(milestone.displayDate), key: `/milestone/${goalId}/${id}`, y: index, label: milestone.name, symbol: 'square', strokeWidth: 3, size: 5, fill: milestoneFill })
      }
    }
    if (goal.checkIns) {
      for (var id in goal.checkIns) {
        var checkin = goal.checkIns[id]
        data.push({ x: new Date(checkin.displayDate), key: `/checkin/${goalId}/${id}`, y: index, label: checkin.name, symbol: 'diamond', strokeWidth: 3, fill: goal.color.hex })

      }
    }
    return data
  }

  chooseEndSymbol(goal) {
    if (goal.isOpen) return 'circle'
    else return 'star'
  }

  chooseMilestoneFill(goal, milestone) {
    if (milestone.isOpen) return 'white'
    else return goal.color.hex
  }

  getLineData(goal, index) {

    var data = []
    // push start and end dates to data array
    // maybe make end date of completed goals into a star??
    data.push({ x: new Date(goal.startDate), y: index, label: `${goal.name}` })
    data.push({ x: new Date(goal.endDate), y: index })
    // then iterate over the milestones object and push each date to the array
    if (goal.milestones) {
      for (var id in goal.milestones) {
        var milestone = goal.milestones[id]
        data.push({ x: new Date(milestone.displayDate), y: index })
      }
    }
    if (goal.checkIns) {
      for (var id in goal.checkIns) {
        var checkin = goal.checkIns[id]
        data.push({ x: new Date(checkin.displayDate), y: index })

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
    console.log('in handleLineTap!!!')
    console.log('what is event client x/y in handling line tap??', event)
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

  // POPOVER OPTIONS

  viewCurrentTimeline = () => {
    event.preventDefault()
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
    console.log('this.state.goals???', this.state.goals)
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

  unsubscribeGoals() {
    if (this.userGoalUnsubscribers) this.userGoalUnsubscribers.forEach(x => x())
  }

  listenTo(fireRef) {
    if (this.unsubscribe) this.unsubscribe()
    this.unsubscribeGoals()

    goalsListener = fireRef.on('value', (snapshot) => {

      const goals = {}
      let userGoalIds = Object.keys(snapshot.val())
      this.userGoalUnsubscribers =
        userGoalIds.map(goalId => {
          const ref = goalsRef.child(goalId)
          let listener = ref.on('value', (goalSnapshot) => {
            goals[goalId] = goalSnapshot.val()
            this.setState({ goals: Object.entries(goals) })
          })
          return () => ref.off('value', listener)
        })
    })

    // Set unsubscribe to be a function that detaches the listener.
    this.unsubscribe = () => {
      this.unsubscribeGoals()
      fireRef.off('value', goalsListener)
    }
  }

  render() {
    const chartStyle = { parent: { width: '100%', padding: '0', margin: '0'} }
    const sansSerif = "'Roboto', 'Helvetica Neue', Helvetica, sans-serif"
    const { goals } = this.state
    return (
      <div className='timeline-container container-fluid'>
        <div className='container chart1'>
          {this.state.goals.length > 0 ?
            <VictoryChart
              width={1000}
              height={400}
              scale={{ x: 'time' }}
              style={chartStyle}
              domainPadding={{x: [20, 20]}}
              domain={{ y: [-1, this.state.goals.length] }}
              containerComponent={
                <VictoryZoomContainer
                  dimension='x'
                  zoomDomain={this.state.zoomDomain}
                  onDomainChange={this.handleZoom.bind(this)}
                />
              }
              padding={{top: 0, left: 0, right: 0, bottom: 0}}
            >
            <VictoryAxis
              style={{
                axis: {
                  stroke: 'none'
                },
                tickLabels: {
                  angle: 0,
                  padding: 30,
                  border: 1,
                  fontFamily: sansSerif
                }
              }}
            />
            <VictoryLine
              style={{
                data: { stroke: '#888', strokeWidth: 1 },
                labels: { fill: "#888", fontFamily: sansSerif }
              }}
              data={[
                { x: new Date(), y: 0, label: 'today'},
                { x: new Date(), y: 400 }
              ]}
              labelComponent={<VictoryLabel dy={35} />}
            />

            {
              this.state.goals && this.state.goals.map((goal, index) => {
                // get goal info out of goal array: index 0 is goal id and index 1 is object with all other data
                let goalInfo = goal[1]
                let goalId = goal[0]
                return (
                  <VictoryLine
                    key={index}
                    animate={{duration: 500}}
                    style={{
                      data: {
                        stroke: goalInfo.color.hex,
                        strokeWidth: 4,
                        cursor: "pointer"
                      },
                      labels: { fill: "#888", fontFamily: sansSerif, fontWeight: "lighter" }
                    }}
                    events={[{
                      target: 'data',
                      eventHandlers: {
                        onClick: (event) => { this.handleLineTap(event, goal)
                        console.log('clicked line #', index, ', with ID ', goalId)
                        console.log('what is goalInfo?? ', goalInfo)
                        }
                      }
                    }]}
                    data={this.getLineData(goalInfo, index)}
                    labelComponent={<VictoryLabel x={500} textAnchor="start" />}
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
                        // strokeWidth: 3,
                        // fill: 'white',
                        cursor: "pointer"
                      },
                      labels: { fontFamily: sansSerif }
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
          : <div id='empty-message'><Empty /></div> }
        </div>

      {/* Overview chart at the bottom
          (Only shown if there are goals) */}

        {this.state.goals.length > 0 ?
          <div className='container chart2'>
          <VictoryChart
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
        </div> : null }
        <FloatingActionButton secondary={true} onTouchTap={this.createNewGoal} style={{ position: 'fixed', top: '87%', right: '5%' }} >
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
            <MenuItem primaryText='Add milestone' onTouchTap={this.addMilestoneToCurrentTimeline} />
            <MenuItem primaryText='Goal overview' onTouchTap={this.viewCurrentTimeline} />
          </Menu>
        </Popover>
      </div>

    )
  }
}
