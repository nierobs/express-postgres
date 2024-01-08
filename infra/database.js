'use strict'

const pgp = require('pg-promise')()

const connectionString = process.env.DB_URL || 'postgres://root:123456@localhost:5432/blog'

const db = pgp({ connectionString })

db.connect().then(function() {
  console.log('Connected to the database')
}).catch(function(e) {
  console.error('Database error:', e.message || e)
})

module.exports = db
