const { check } = require('express-validator')

module.exports = {

  UserPost () {
    const v1 = check('Name').isString()
    const v2 = check('Email').isEmail()
    const v3 = check('Password').isLength({ min: 8 }).not().isIn(['123', 'password'])
    return [v1, v2, v3]
  },
  Userbyid () {
    const v1 = check('id').isUUID
    return [v1]
  },
  UserPostLogin () {
    const v1 = check('Email').isEmail()
    const v2 = check('Password').isLength({ min: 8 }).not().isIn(['123', 'password'])
    return [v2, v1]
  },
  UserEmail () {
    const v1 = check('Email').isEmail()
    return [v1]
  }
}
