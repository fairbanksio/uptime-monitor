var express = require('express');
var router = express.Router();
let NotificationController = require('../controllers/notification');
var passport = require('passport');

// Handle Notifications
router.post('/', passport.authenticate('jwt', { session: false}), NotificationController.create); // Create users (Register)
router.get('/', passport.authenticate('jwt', { session: false}), NotificationController.getAll); // Read or get users
router.get('/:notificationId', passport.authenticate('jwt', { session: false}), NotificationController.getOne);
router.post('/:notificationId', passport.authenticate('jwt', { session: false}), NotificationController.update); // Update users
router.delete('/:notificationId', passport.authenticate('jwt', { session: false}), NotificationController.delete); // Delete users


module.exports = router;
