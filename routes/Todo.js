const express = require('express')
const router = express.Router()
const todo = require('../controllers').todo

router.get('/todo', todo.getTodos)
router.get('/todo/:userId', todo.getUserTodos)
router.post('/todo/:userId', todo.addTodo)

module.exports = router
