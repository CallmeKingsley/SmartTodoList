const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  Name: String,
  Email: String,
  Password: String,
  createdTodos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'todoItem'
  }]
})

module.exports = mongoose.model('UserSchema', UserSchema)
