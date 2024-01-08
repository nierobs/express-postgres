'use strict'

const express = require('express')
const router = express.Router()
const postsService = require('../service/postsService')

const baseUrl = process.env.API_URL || 'http://localhost:8080'

router.get('/posts', async function(req, res, next) {
  try {
    const posts = await postsService.getPosts()
    res.json(posts)
  } catch (e) {
    next(e)
  }
})

router.get('/posts/:id', async function(req, res, next) {
  const { id } = req.params
  try {
    const post = await postsService.getPost(id)
    res.json(post)
  } catch (e) {
    next(e)
  }
})

router.post('/posts', async function(req, res, next) {
  const post = req.body
  try {
    const createdPost = await postsService.savePost(post)
    res.status(201).location(`${baseUrl}/posts/${createdPost.id}`).end()
  } catch (e) {
    next(e)
  }
})

router.put('/posts/:id', async function(req, res, next) {
  const { id } = req.params
  const post = req.body
  try {
    await postsService.updatePost(id, post)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

router.delete('/posts/:id', async function(req, res, next) {
  const { id } = req.params
  try {
    await postsService.deletePost(id)
    res.status(204).end()
  } catch (e) {
    next(e)
  }
})

module.exports = router
