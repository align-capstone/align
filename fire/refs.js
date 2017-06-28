import firebase from 'APP/fire'
const db = firebase.database()

exports.getGoalRefs = id => ({
  idRef: db.ref('goals').child(id),
  nameRef: db.ref('goals').child(id).child('name'),
  descriptionRef: db.ref('goals').child(id).child('description'),
  isOpenRef: db.ref('goals').child(id).child('isOpen'),
  startRef: db.ref('goals').child(id).child('startDate'),
  endRef: db.ref('goals').child(id).child('endDate'),
  colorRef: db.ref('goals').child(id).child('color'),
  milestonesRef: db.ref('goals').child(id).child('milestones')
})

exports.getMilestoneRefs = (goalId, mileId) => ({
  milestoneRef: db.ref('goals').child(goalId).child('milestones').child(mileId),
  nameRef: db.ref('goals').child(goalId).child('milestones').child(mileId).child('name'),
  descriptionRef: db.ref('goals').child(goalId).child('milestones').child(mileId).child('description'),
  isOpenRef: db.ref('goals').child(goalId).child('milestones').child(mileId).child('isOpen'),
  dateRef: db.ref('goals').child(goalId).child('milestones').child(mileId).child('displayDate')
})
