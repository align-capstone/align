import React from 'react'
import Paper from 'material-ui/Paper'

import Login from './Login'

const moduleStyle = {
  width: '50vw',
  height: '50vh',
  backgroundColor: '#fff',
  margin: 'auto',
}


const Landing = () => {
  return (
    <div className='landing'>
        <Paper zDepth={3} style={moduleStyle}>
          <Login />
        </Paper>
    </div>
  )
}

export default Landing
