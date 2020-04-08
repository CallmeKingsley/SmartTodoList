const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  Name: String,
  Email: String,
  Password: String,
  DateCreated: String,
  DateLastLogin: String,
  DatePasswordChanged: String,
  createdTodos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'todoItem'
  }]
})

module.exports = mongoose.model('UserSchema', UserSchema)
