const UserModel = require('../Models/User')
const { validationResult } = require('express-validator')
const nodemailer = require('nodemailer')

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
      console.log(Email)
      console.log(Password)

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
      console.log('i was in find user by email')
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const Email = req.body.Email
      console.log('email passed down' + Email)
      const user = await UserModel.findOne({ Email: Email })

      res.status(200).json({
        user,
        message: 'User with that email already exist'
      })
    } catch (e) {
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
  },
  sendResetPasswordEmail: async (res, req) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

      const Email = req.body.Email
      const user = await UserModel.findOne({ Email: Email })

      if (user) {
        const testAccount = await nodemailer.createTestAccount()

        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
          }
        })

        const info = await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: Email, // list of receivers
          subject: 'Hello ✔', // Subject line
          text: 'Hello world?' + 'http://' + req.heade.host + '/users/', // plain text body
          html: '<b>Hello world?</b>' // html body
        }, err => {
          res.status(200).json({
            message: 'Email sent'
          })
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
