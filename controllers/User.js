const UserModel = require('../Models/User')
const mongoose = require('mongoose')

module.exports = {

  getUser (req, res) {
    UserModel.find()
      .exec()
      .then(docs => {
        console.log(docs)
        //   if (docs.length >= 0) {
        res.status(200).json(docs)
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
  },

  findUser (req, res) {
    const id = req.params.userId
    console.log(id)
    UserModel.findById(id)
      .exec()
      .then(doc => {
        console.log('From database', doc)
        if (doc) {
          res.status(200).json(doc)
        } else {
          res
            .status(404)
            .json({ message: 'No valid entry found for provided ID' })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
      })
  },
  UpdateUser (req, res) {
    const id = req.params.userId
    const updateOps = {}
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value
    }
    UserModel.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result)
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
  },
  addUser (req, res) {
    const user = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      Email: req.body.email,
      Password: req.body.password,
      Name: req.body.name
    })
    console.log(user)
    user
      .save()
      .then(result => {
        console.log(result)
        res.status(201).json({
          message: 'Handling POST requests to /user',
          createdUser: result
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
  }
}
