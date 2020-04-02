const express = require('express')
const router = express.Router()

const user = require('./user')
const todo = require('./Todo')

router.use('/users', user)
router.use('/todos', todo)

module.exports = router
