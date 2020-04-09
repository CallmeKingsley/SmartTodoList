const express = require('express')
const router = express.Router()
const validation = require('./Validation/user')
const user = require('../controllers').user

router.get('/user', user.getUsers)
router.post('/user/resetpassworddata', user.resetPasswordData)
router.post('/user/resetpassword', user.resetPasswordEmail)
router.post('/user/signup', validation.UserEmail(), user.findUserbyEmail)
router.post('/user/login', validation.UserPostLogin(), user.loginUser)
router.post('/user', validation.UserPost(), user.addUser)
router.get('/user/:id', validation.Userbyid(), user.findUser)
router.put('/user/:id', validation.Userbyid(), user.UpdateUser)
router.delete('/user/:id', validation.Userbyid(), user.deleteUser)

module.exports = router
