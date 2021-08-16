var express = require('express');
var router = express.Router();
let User = require('../models/user');
var passport = require('passport');

// Get all users
router.get('/', passport.authenticate('jwt'), function(req, res, next) {
  User.find().select('-password') // get all fields except password
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
});

// INSERT USER SHOULD BE DONE VIA AUTH ROUTE!
// Create one user
//router.post('/', function(req, res, next) {
//  var newUser = new User(req.body)
//  newUser.save()
//		.then(user => {
//			res.json(user);
//		})
//		.catch(err => {
//			res.status(422).send(err.errors);
//		});
//});

// Read one user
router.get('/:userId', passport.authenticate('jwt'), function(req, res, next) {
  
  User.findOne({_id: req.params.userId})
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
});

// Update one user
router.post('/:userId', passport.authenticate('jwt'), function(req, res, next) {
  User.findByIdAndUpdate({_id: req.params.userId}, req.body)
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
});

// Delete one user
router.delete('/:userId', passport.authenticate('jwt'), function(req, res, next) {
  User.deleteOne({_id: req.params.userId}).select('-password')
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
});

module.exports = router;
