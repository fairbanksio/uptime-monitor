var express = require('express');
let Notification = require('../models/notification');

// Get all notifications
exports.getAll = (req, res, next) => {
	Notification.find({owner: req.user._id})
		.then(notifications => {
			res.json(notifications);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
};

// Create notification
exports.create = (req, res, next) => {
	const {name, type, url} = req.body
	const {user} = req
	var newNotification = new Notification({
		name: name,
		url: url,
		type: type,
		owner: user._id
	})
	newNotification.save()
		.then(notification => {
			res.json(notification);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
};

// Read one notification
exports.getOne = (req, res, next) => {
  
  Notification.findOne({_id: req.params.notificationId, owner: req.user._id})
		.then(notification => {
			res.json(notification);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
};

// Update one notification
exports.update = (req, res, next) => {
	Notification.findByIdAndUpdate({_id: req.params.notificationId, owner: req.user._id}, req.body, {new: true})
		.then(notification => {
			res.json(notification);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
};

// Delete one notification
exports.delete = (req, res, next) => {
	// delete doesn't return an object id and we need it to stop notification
	Notification.findOne({_id: req.params.notificationId, owner: req.user._id})
		.then(notification => {
			notificationingService.stopNotification(notification._id)
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});

	// delete notification
	Notification.deleteOne({_id: req.params.notificationId})
		.then(deleteResult => {
			res.json(deleteResult);
		})
		.catch(err => {
			res.status(422).send(err.errors);
		});
};

