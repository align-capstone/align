import React from 'react'
import { Link } from 'react-router'

const NotFound = props => {
  const {pathname} = props.location || {pathname: '<< no path >>'}
  console.error('NotFound: %s not found (%o)', pathname, props)
  return (
    <div>
      <h1>Looks like there's no page here</h1>
      <p>Lost? <Link to="/">Here's a way home.</Link></p>
    </div>
  )
}

export default NotFound
