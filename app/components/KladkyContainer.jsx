import React from 'react'
import {Route} from 'react-router'

import {getGoalRefs} from 'APP/fire/refs'

import Kladky from './Kladky'

export default ({params: {id}}) => {
  const goalRefs = getGoalRefs(id)
  return (
    <div>
      <h1>Edit page for goal ID: {id}</h1>
      {/* hopefully modify our test goal? */}
      <Kladky
        fireRef={goalRefs}
        id={id}
      />
    </div>
  )
}
