var express = require('express');
var router = express.Router();
let Monitor = require('../models/monitor');
var passport = require('passport');
var monitoringService = require('../services/monitoring')

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
			monitoringService.startMonitor(monitor._id)
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
  Monitor.findByIdAndUpdate({_id: req.params.monitorId}, req.body, {new: true})
		.then(monitor => {
			monitoringService.updateMonitor(monitor._id)
			res.json(monitor);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
});

// Delete one monitor
router.delete('/:monitorId', passport.authenticate('jwt'), function(req, res, next) {
	// delete doesn't return an object id and we need it to stop monitor
	Monitor.findOne({_id: req.params.monitorId})
		.then(monitor => {
			monitoringService.stopMonitor(monitor._id)
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});

	// delete monitor
	Monitor.deleteOne({_id: req.params.monitorId})
		.then(deleteResult => {
			res.json(deleteResult);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
});

module.exports = router;
