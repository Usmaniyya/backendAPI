const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) {
      res.json({
        error: err,
      })
    }
    // Creating empty user object
    let newUser = new User({
      // Initialize newUser object with request data
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    })
    // Save newUser object to database
    newUser
      .save()
      .then((user) => {
        res.json({
          message: 'User added Succesfully',
          user,
        })
      })
      .catch((error) => {
        res.json({
          message: 'User already exist',
        })
      })
  })
}

const login = (req, res, next) => {
  var email = req.body.email
  var password = req.body.password

  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({
            error: err,
          })
        }
        if (result) {
          let token = jwt.sign({ name: user.name }, 'verySecretValue', {
            expiresIn: '1h',
          })
          res.json({
            message: 'Login successful',
            token,
          })
        } else {
          res.json({
            message: 'Incorrect Password',
          })
        }
      })
    } else {
      res.json({
        message: 'No user found',
      })
    }
  })
}

module.exports = {
  register,
  login,
}
