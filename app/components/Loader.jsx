import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const Loader = () => {
  return (
    <div id="loader">
      <CircularProgress size={80} thickness={10} color="#888" />
    </div>
  )
}

export default Loader
