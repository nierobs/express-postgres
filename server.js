'use strict'

const express = require('express')
const app = express()

const port = process.env.API_PORT || 8080
const baseUrl = process.env.API_URL || 'http://localhost:8080'

app.use(express.json())
app.use('/', require('./route/postsRoute'))

app.use(function(err, req, res, next) {
  switch(err.message) {
    case 'Post not found':
      res.status(404)
      break
    case 'Post already exists':
      res.status(409)
      break
    default:
      res.status(500)
  }
  res.json({ error: { message: err.message }})
})

app.listen(port, function () {
  console.log(`App listening on ${baseUrl}`)
})
