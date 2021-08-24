var express = require('express')
var router = express.Router()
let NotificationController = require('../../controllers/notification')
var passport = require('passport')

// Handle Notifications
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  NotificationController.create
) // Create notifications
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  NotificationController.getAll
) // Read or get notifications
router.get(
  '/:notificationId',
  passport.authenticate('jwt', { session: false }),
  NotificationController.getOne
)
router.post(
  '/:notificationId',
  passport.authenticate('jwt', { session: false }),
  NotificationController.update
) // Update notifications
router.delete(
  '/:notificationId',
  passport.authenticate('jwt', { session: false }),
  NotificationController.delete
) // Delete notifications

module.exports = router
