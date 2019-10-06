const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    todoItem: String,
    userId: Number,
});

module.exports = mongoose.model('todoItem', todoSchema);