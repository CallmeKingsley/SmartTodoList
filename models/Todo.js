const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
  todoItem: String,
  createdTime: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserSchema'
  }
})

module.exports = mongoose.model('todoItem', todoSchema)
