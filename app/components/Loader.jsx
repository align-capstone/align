import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const Loader = () => {
  return (
    <div>
      <CircularProgress size={80} thickness={10} />
    </div>
  )
}

export default Loader
