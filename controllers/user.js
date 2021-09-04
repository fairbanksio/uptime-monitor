var express = require('express')
let User = require('../models/user')
var jwt = require('jsonwebtoken')
var settings = require('../config/settings')

// Get all users
exports.getAll = (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

exports.create = (req, res, next) => {
  var newUser = new User(req.body)
  newUser
    .save()
    .then((user) => {
      delete user['password'] // probably not needed but extra precaution that password isn't returned. 
      user.token = jwt.sign(user.toJSON(), settings.jwtSecret)
      res.json(user)
    })
    .catch((err) => {
      console.log(err)
      res.status(422).send(err.errors)
    })
}

// Read one user
exports.getOne = (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Get Current User
exports.getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Update one user
exports.update = (req, res, next) => {
  User.findByIdAndUpdate({ _id: req.params.userId }, req.body, { new: true })
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}

// Delete one user
exports.delete = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .then((users) => {
      res.json(users)
    })
    .catch((err) => {
      res.status(422).send(err.errors)
    })
}
