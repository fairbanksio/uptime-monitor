var express = require('express')
let User = require('../models/user')
var jwt = require('jsonwebtoken')
var settings = require('../config/settings')

// Register a new user
exports.register = (req, res, next) => {
  var newUser = new User(req.body)
  newUser
    .save() // get all fields except password
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Authenticate
exports.login = (req, res, next) => {
  User.findOne(
    {
      username: req.body.username,
    },
    function (err, user) {
      if (err) throw err
      if (!user) {
        res.status(401).send({ success: false, msg: 'Authentication failed' }) //user not found
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = ''
            delete user['password']
            // return the information including token as JSON
            user.token = jwt.sign(user.toJSON(), settings.jwtSecret)
            res.json(user)
          } else {
            res.status(401).send({ success: false, msg: err }) //wrong password
          }
        })
      }
    }
  ).select('+password')
}

// Sign out
exports.logout = (req, res, next) => {
  User.findByIdAndUpdate({ _id: req.params.userId }, req.body) // get all fields except password
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

exports.loginGoogle = (req, res) => {
  if (!req.user) {
    return res.send(401, 'User Not Authenticated');
  }
  User.findOne({
    _id: req.user.id
  }, function (err, user) {
    // if user is found and password is right create a token
    var token = jwt.sign(user.toJSON(), settings.jwtSecret);

    res.json({ success: true, token: 'JWT ' + token, username: user.username, name: user.name, admin: user.admin, id: user._id});

  });
}

