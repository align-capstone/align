// MPM: I'm thinking this'll be a dumb component that gets contained by / receives props from the goal / milestone / check-in ?
  // so, really just a render function that we'll call for each thing in resources

// should this be a Resources component?  instead of receiving props re: an individual milestone, pass in all of them ?? [no]

// either way, the idea is that the user will input a URL, and we'll scrape that URL to render the resource 'card'?
// a resource card should contain: title, thumbnail photo, and a description at the bottom, and it should link somewhere

// iterate over all the img tags and extract 'href' or whatever
// ...

// instead of having back-end API routes, just make ajax request from in here?
// and then maybe we can refactor to do it with an express route
// fuck actually we want to do this server-side to avoid cross-origin issues
// except it's probably the case that that API we want to use will allow CORS
// scrape each page for URL images, and then in the actual card, make those images link to the resource

// extract the title tag, plus the img tag sources that seem the most appropriate... <img src=....
// and, don't redo this work every time; store the title and image in the database

import React, {Component} from 'react'
import $ from 'jquery'
// import axios from 'axios'

export default class extends Component {
  constructor(props) {
    super()
    this.state = {
      title: ''
    }
  }

  componentDidMount() {
    const resourceUrl = 'http://api.linkpreview.net/?key=123456&q=https://www.google.com/'

    // $(function(resourceUrl) {
    //   $.ajax({
    //     type: 'GET',
    //     url: resourceUrl,
    //     success: function(preview) {
    //       const title = preview.title
    //       console.log(title)
    //     }
    //   })
    // })

    const target = 'https://www.google.com'

    $.ajax({
      url: 'http://api.linkpreview.net',
      dataType: 'jsonp',
      data: {q: target, key: '123456'},
      success: function(response) {
        console.log(response)
      }
    })

    // MPM ugh ugh axios doesn't support jsonp or whatever for cross-origin requests
    // axios.get('http://api.linkpreview.net/?key=123456&q=https://www.google.com/')
    // .then(res => {
    //   console.log('res from inside Resource component? ', res)
    //   const title = res.title
    //   this.setState({ title })
    // })
  }

  render() {
    return (
      <div>
        <h1>lol what</h1>
      </div>
    )
  }
}

/*
let resourceUrl = 'http://api.linkpreview.net/?key=123456&q=https://www.google.com/'

$(function(resourceUrl) {
  $.ajax({
    type: 'GET',
    url: resourceUrl,
    success: function(preview) {
      const title = preview.title
      console.log(title)
    }
  })
})
*/
