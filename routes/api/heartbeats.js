var express = require('express')
var router = express.Router()
let HeartbeatController = require('../../controllers/heartbeat')
var passport = require('passport')

// Handle Heartbeats
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  HeartbeatController.create
) // Create heartbeats
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  HeartbeatController.getAll
) // Read or get heartbeats
router.get(
  '/:heartbeatId',
  passport.authenticate('jwt', { session: false }),
  HeartbeatController.getOne
)
router.post(
  '/:heartbeatId',
  passport.authenticate('jwt', { session: false }),
  HeartbeatController.update
) // Update heartbeats
router.delete(
  '/:heartbeatId',
  passport.authenticate('jwt', { session: false }),
  HeartbeatController.delete
) // Delete heartbeats

module.exports = router
