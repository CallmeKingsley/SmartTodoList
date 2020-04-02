const express = require('express')
const router = express.Router()
const validation = require('./Validation/user')
const user = require('../controllers').user

router.get('/user', user.getUsers)
router.post('/user',validation.UserPost(), user.addUser)
router.get('/user/:id',validation.Userbyid(), user.findUser)
router.put('/user/:id',validation.Userbyid(),user.UpdateUser)
router.delete('/user/:id',validation.Userbyid(), user.deleteUser)

module.exports = router
