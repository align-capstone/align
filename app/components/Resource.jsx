// MPM: I'm thinking this'll be a presentational component that we'll call for each thing in resources

// should this be a Resources component?  instead of receiving props re: an individual milestone, pass in all of them ??
// either way, the idea is that the user will input a URL, and we'll scrape that URL to render the resource 'card'?
// a resource card should contain: title, thumbnail photo, and a description at the bottom, and it should link somewhere
// EITHER WAY, store that information IN THE DATABASE, meaning MOVE the ajax request out of here

// figured out how to avoid issues with cross-origin requests
// but, I still think we might want to refactor this as a back-end route
// especially bc I don't think we want the API key on the front end???

// MOVE THIS AJAX REQUEST
// don't redo this work every time; store the title and image in the database
// so, fire this ajax request ONLY when the resource URL gets added or modified (i.e. when we write to db)
// but, don't have an onChange tied to the resource URL text field... don't want this to fire for incomplete URLS
// instead, have a plus button by the rest of our resources that opens up a text field
// onSubmit / onBlur (NOT onChange) sends to db and fires ajax request

import React, {Component} from 'react'
import $ from 'jquery'

export default class extends Component {
  constructor(props) {
    super()
    this.state = {
      title: ''
      // thumbnail, description, etc.
    }
  }

  componentDidMount() {
    // eventually pass this resource URL in as props?
    const target = 'http://vitals.lifehacker.com/get-closer-to-doing-a-handstand-in-12-minutes-1796377028'

    $.ajax({
      url: 'http://api.linkpreview.net',
      dataType: 'jsonp',
      data: {q: target, key: '59546c0da716e80a54030151e45fe4e025d32430c753a'},
      success: function(response) {
        console.log(response)
      }
    })
  }

  // here, render the actual resource card with title, thumbnail, and description
  render() {
    return (
      <div>
        <h1>lol what</h1>
      </div>
    )
  }
}
