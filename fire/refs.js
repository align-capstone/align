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
  milestonesRef: db.ref('goals').child(id).child('milestones'),
  checkInsRef: db.ref('goals').child(id).child('checkIns'),
  resourcesRef: db.ref('goals').child(id).child('resources'), // will return an object of resource ids on a goal
  uploadsRef: db.ref('goals').child(id).child('uploads'),
})

exports.getMilestoneRefs = (goalId, mileId) => ({
  milestoneRef: db.ref('goals').child(goalId).child('milestones').child(mileId),
  nameRef: db.ref('goals').child(goalId).child('milestones').child(mileId).child('name'),
  descriptionRef: db.ref('goals').child(goalId).child('milestones').child(mileId).child('description'),
  isOpenRef: db.ref('goals').child(goalId).child('milestones').child(mileId).child('isOpen'),
  dateRef: db.ref('goals').child(goalId).child('milestones').child(mileId).child('displayDate'),
  resourcesRef: db.ref('goals').child(goalId).child('milestones').child(mileId).child('resources'), // will return an object of resource ids on the milestone
  uploadsRef: db.ref('goals').child(goalId).child('milestones').child(mileId).child('uploads'),
  parentRef: db.ref('goals').child(goalId)
})

exports.getCheckInRefs = (goalId, checkId) => ({
  checkInRef: db.ref('goals').child(goalId).child('checkIns').child(checkId),
  nameRef: db.ref('goals').child(goalId).child('checkIns').child(checkId).child('name'),
  descriptionRef: db.ref('goals').child(goalId).child('checkIns').child(checkId).child('description'),
  dateRef: db.ref('goals').child(goalId).child('checkIns').child(checkId).child('displayDate'),
  resourcesRef: db.ref('goals').child(goalId).child('checkIns').child(checkId).child('resources'), // will return an object of resource ids on the check-in
  uploadsRef: db.ref('goals').child(goalId).child('checkIns').child(checkId).child('uploads'),
  parentRef: db.ref('goals').child(goalId)
})

exports.getResourceRefs = id => ({
  resourceRef: db.ref('resources').child(id),
  urlRef: db.ref('resources').child(id).child('url'),
  titleRef: db.ref('resources').child(id).child('title'),
  imageRef: db.ref('resources').child(id).child('image'),
  descriptionRef: db.ref('resources').child(id).child('description')
})
