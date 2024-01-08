'use strict'

const axios = require('axios')
const crypto = require('crypto')
const postsService = require('../service/postsService')

const baseUrl = process.env.API_URL || 'http://localhost:8080'

const generate = function() {
  return crypto.randomBytes(20).toString('hex')
}

const request = function(url, method, data) {
  return axios({ url, method, data, validateStatus: false })
}

beforeEach(function() {
  return postsService.deletePosts()
})

test('Should get posts', async function() {
  for(let i = 0; i < 3; i++) await postsService.savePost({ title: generate(), content: generate() })

  const response = await request(`${baseUrl}/posts`, 'get')
  expect(response.status).toBe(200)

  const posts = response.data
  expect(posts).toHaveLength(3)
})

test('Should get a post', async function() {
  const { id } = await postsService.savePost({ title: generate(), content: generate() })

  const response = await request(`${baseUrl}/posts/${id}`, 'get')
  expect(response.status).toBe(200)
})

test('Should not get a post', async function() {
  const id = crypto.randomUUID()

  const response = await request(`${baseUrl}/posts/${id}`, 'get')
  expect(response.status).toBe(404)
})

test('Should save a post', async function() {
  const data = { title: generate(), content: generate() }

  const response = await request(`${baseUrl}/posts`, 'post', data)
  expect(response.status).toBe(201)

  const { location } = response.headers

  const createdPost = await request(location, 'get')
  expect(createdPost.data.title).toBe(data.title)
  expect(createdPost.data.content).toBe(data.content)
})

test('Should not save a post', async function() {
  const data = { title: generate(), content: generate() }

  await request(`${baseUrl}/posts`, 'post', data)

  const response = await request(`${baseUrl}/posts`, 'post', data)
  expect(response.status).toBe(409)
})


test('Should update a post', async function() {
  const { id } = await postsService.savePost({ title: generate(), content: generate() })

  const data = { title: generate(), content: generate() }

  const response = await request(`${baseUrl}/posts/${id}`, 'put', data)
  expect(response.status).toBe(204)

  const updatedPost = await postsService.getPost(id)
  expect(updatedPost.title).toBe(data.title)
  expect(updatedPost.content).toBe(data.content)
})

test('Should not update a post', async function() {
  const id = crypto.randomUUID()
  const data = { title: generate(), content: generate() }

  const response = await request(`${baseUrl}/posts/${id}`, 'put', data)
  expect(response.status).toBe(404)
})

test('Should delete a post', async function() {
  const { id } = await postsService.savePost({ title: generate(), content: generate() })

  const response = await request(`${baseUrl}/posts/${id}`, 'delete')
  expect(response.status).toBe(204)

  const posts = await postsService.getPosts()
  expect(posts).toHaveLength(0)
})
