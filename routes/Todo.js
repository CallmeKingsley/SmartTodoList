const express = require('express');
const router = express.Router();

const todoItem = require('../controllers').todoItem;

router.get('/todos',todoItem.getAlltodos);
router.post('/todos', todoItem.addtodoItem);
router.get('/todos/:id',todoItem.getIndividualtodo);
router.put('/todos/:id',todoItem.deleteTodo);

module.exports = router;