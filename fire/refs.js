import firebase from 'APP/fire'
const db = firebase.database()

exports.getGoalRefs = id => ({
  idRef: db.ref('goals').child(id),
  nameRef: db.ref('goals').child(id).child('name'),
  descriptionRef: db.ref('goals').child(id).child('description'),
  isOpenRef: db.ref('goals').child(id).child('isOpen'),
  startRef: db.ref('goals').child(id).child('startDate'),
  endRef: db.ref('goals').child(id).child('endDate')
})
