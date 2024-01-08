'use strict'

const db = require('../infra/database')

exports.getPosts = function() {
  return db.any('SELECT * FROM post')
}

exports.getPost = function(id) {
  return db.oneOrNone('SELECT * FROM post WHERE id = $1', id)
}

exports.getPostByTitle = function(title) {
  return db.oneOrNone('SELECT id FROM post WHERE title = $1', title)
}

exports.savePost = function(post) {
  return db.one('INSERT INTO post(title, content) VALUES($1, $2) RETURNING id', [post.title, post.content])
}

exports.updatePost = function(id, post) {
  return db.none('UPDATE post SET title = $1, content = $2 WHERE id = $3', [post.title, post.content, id])
}

exports.deletePost = function(id) {
  return db.none('DELETE FROM post WHERE id = $1', id)
}

exports.deletePosts = function() {
  return db.none('TRUNCATE TABLE post')
}
