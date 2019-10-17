const express = require('express');
const router = express.Router();

const user = require('./user');
const todos = require('./Todo');

router.use('/users',user)
router.use('/todos',todos)

module.exports = router;