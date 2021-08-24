var express = require('express')
var router = express.Router()
let EventController = require('../../controllers/event')
var passport = require('passport')

// Handle Events
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  EventController.create
) // Create events
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  EventController.getAll
) // Read or get events
router.get(
  '/:eventId',
  passport.authenticate('jwt', { session: false }),
  EventController.getOne
)
router.post(
  '/:eventId',
  passport.authenticate('jwt', { session: false }),
  EventController.update
) // Update events
router.delete(
  '/:eventId',
  passport.authenticate('jwt', { session: false }),
  EventController.delete
) // Delete events

module.exports = router
