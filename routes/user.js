const express = require('express');
const router = express.Router();

const user = require('../controllers').user;

router.get('/users',user.getUser);
router.post('/users', user.addUser);
router.get('/users/:userId',user.findUser)

module.exports = router;