import React from 'react'
import {Route} from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()

import Kladky from './Kladky'

export default ({params: {id}}) =>
  <div>
    <h1>Edit page for goal ID: {id}</h1>
    {/* hopefully modify our test goal? */}
    <Kladky
      fireRef={db.ref('goals').child(id)}
      id={id}
    />
  </div>