var express = require('express');
var router = express.Router();
let Monitor = require('../models/monitor');
var passport = require('passport');

// Get all monitors
router.get('/', passport.authenticate('jwt'), function(req, res, next) {
  Monitor.find()// get all fields except password
		.then(monitors => {
			res.json(monitors);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
});

// Create monitor
router.post('/', function(req, res, next) {
  var newMonitor = new Monitor(req.body)
  newMonitor.save()
		.then(monitor => {
			res.json(monitor);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
});

// Read one monitor
router.get('/:monitorId', passport.authenticate('jwt'), function(req, res, next) {
  
  Monitor.findOne({_id: req.params.monitorId})
		.then(monitor => {
			res.json(monitor);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
});

// Update one monitor
router.post('/:monitorId', passport.authenticate('jwt'), function(req, res, next) {
  Monitor.findByIdAndUpdate({_id: req.params.monitorId}, req.body)
		.then(monitor => {
			res.json(monitor);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
});

// Delete one monitor
router.delete('/:monitorId', passport.authenticate('jwt'), function(req, res, next) {
  Monitor.deleteOne({_id: req.params.monitorId})
		.then(monitors => {
			res.json(monitors);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
});

module.exports = router;
