const UserModel = require('../Models/User')
const { validationResult } = require('express-validator')
const nodemailer = require('nodemailer')
const { isNil } = require('ramda')
require('dotenv').config()

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

  loginUser: async (req, res) => {
    try {
      const Email = req.body.Email
      const Password = req.body.Password

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      const user = await UserModel.findOne({ Email: Email, Password: Password })
      res.status(200).json({
        user: user
      })
    } catch (err) {
      res.status(204).json({
        error: err
      })
    }
  },

  findUserbyEmail: async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const Email = req.body.Email
      const user = await UserModel.findOne({ Email: Email })

      res.status(200).json({
        user,
        message: 'User with that email already exist'
      })
    } catch (err) {
      res.status(404).json({
        error: err,
        message: 'couldn\'t find a user'
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
  deleteUser: async (req, res) => {
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
  },

  resetPasswordData: async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      const userId = req.body.Id
      const newPassword = req.body.Password

      const UserInfo = await UserModel.findOneAndUpdate({ _id: userId }, { $set: { Password: newPassword } }, (err, data) => {
        if (data) {
          res.status(200).json({
            data
          })
        }
        if (err) {
          res.status(500).json({
            data
          })
        }
      })
    } catch (e) {
      res.status(500).json({
        user: e,
        message: 'could\'t update password'
      })
    }
  },

  resetPasswordEmail: async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      const Email = req.body.Email
      const user = await UserModel.findOne({ Email: Email })
      if (user) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.mailtrap.io',
          port: 2525,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.EmailServer_UserName,
            pass: process.env.EmailServer_Password
          }
        })
        var str = new String(process.env.FrontEnd_URL + '/forgotPw/' + user._id)
        var URL = process.env.FrontEnd_URL + '/forgotPw/' + user._id
        var Link = str.link(URL)

        const info = await transporter.sendMail({
          from: process.env.Company_Email, // sender address
          to: Email, // list of receivers
          subject: 'futureCompany reset password request ✔', // Subject line
          html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.<br>' +
          'Please click on the following link, or paste this into your browser to complete the process:<br>' + Link +
          '<br><br>If you did not request this, please ignore this email and your password will remain unchanged.<br>'
        }, errors => {
          if (isNil(errors)) {
            res.status(200).json({
              message: 'Email Sents'
            })
          }
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
