// MPM: I'm thinking this'll be a dumb component that gets contained by / receives props from the goal / milestone / check-in ?
  // so, really just a render function that we'll call for each thing in resources

// should this be a Resources component?  instead of receiving props re: an individual milestone, pass in all of them ?? [no]

// either way, the idea is that the user will input a URL, and we'll scrape that URL to render the resource 'card'?
// a resource card should contain: title, thumbnail photo, and a description at the bottom, and it should link somewhere

// iterate over all the img tags and extract 'href' or whatever
// ...

// server folder

/* in api.js
'use strict'
const api = require('express').Router()
const db = require('../db')
// but instead of requiring db, we'll... send this stuff to firebase somehow how help

api.get('/hello', (req, res) => res.send({hello: 'world'}))
// set up whatever API we're using below
api.use('/whatever', require('./whatever'))

module.exports = api
*/
