import React from 'react'
import Paper from 'material-ui/Paper'

import Login from './Login'

const moduleStyle = {
  width: '50vw',
  minWidth: '500px',
  backgroundColor: '#fff',
  margin: 'auto',
  color: '#000'
}


const Landing = () => {
  return (
    <div className='landing'>
        <Paper zDepth={3} style={moduleStyle} children={<Login/>}>
        </Paper>
    </div>
  )
}

export default Landing
