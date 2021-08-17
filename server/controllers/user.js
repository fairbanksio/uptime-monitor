var express = require('express');
var router = express.Router();
let User = require('../models/user');
var passport = require('passport');

// Get all users
exports.getAll = (req, res, next) => {
  User.find()
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
};


exports.create = (req, res, next) => {
  var newUser = new User(req.body)
  newUser.save()
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
};

// Read one user
exports.getOne = (req, res, next) => {
  
  User.findOne({_id: req.params.userId})
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
};

// Update one user
exports.update = (req, res, next) => {
  User.findByIdAndUpdate({_id: req.params.userId}, req.body, {new: true})
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
};

// Delete one user
exports.delete = (req, res, next) => {
  User.deleteOne({_id: req.params.userId})
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
};
