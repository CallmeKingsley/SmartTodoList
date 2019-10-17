const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    todoItem: String,
    userId: String,
});

module.exports = mongoose.model('todoItemSchema', todoSchema);