const UserModel = require('../Models/User')
const { validationResult } = require('express-validator')

module.exports = {

  getUsers: async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const users = await UserModel.find({})
      res.status(200).json({
        user: users
      })
    } catch (err) {
      res.status(204).json({
        error: err
      })
    }
  },
  findUser: async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const id = req.params.id
      const user = await UserModel.findById(id)
      res.status(500).json({
        user,
        message: 'successfully retrieve user'
      })
    } catch (err) {
      res.status(404).json({
        error: err,
        message: 'couldn\'t find a user'
      })
    }
  },
  UpdateUser: async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const id = req.params.id
      const newUserinfo = req.body
      const updatedUser = this.UserModel.findByIdAndUpdate(id, newUserinfo)
      res.status(200).json({
        user: updatedUser,
        message: 'update user successfully'
      })
    } catch (err) {
      res.status(500).json({
        error: err,
        message: 'could\'t update user'
      })
    }
  },
  addUser: async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const user = new UserModel({
        Email: req.body.Email,
        Password: req.body.Password,
        Name: req.body.Name
      })
      const newUser = await user.save()
      if (newUser) {
        res.status(200).json({
          newUser: user,
          message: 'added user successfully'
        })
      }
    } catch (e) {
      res.status(500).json({
        user: e,
        message: 'could\'t add user'
      })
    }
  },
  deleteUser: async (res, req) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const id = req.params.id
      const deletedUser = UserModel.findByIdAndDelete(id)
      if (deletedUser) {
        res.status(200).json({
          deletedUser,
          message: 'user has been deleted'
        })
      }
    } catch (e) {
      res.status(500).json({
        user: e,
        message: 'could\'t add user'
      })
    }
  }
}
