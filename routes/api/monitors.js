var express = require('express')
var router = express.Router()
let MonitorController = require('../../controllers/monitor')
let EventController = require('../../controllers/event')
let HeartbeatController = require('../../controllers/heartbeat')
var passport = require('passport')

// Handle Monitors
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  MonitorController.create
) // Create monitors
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  MonitorController.getAll
) // Read or get monitors
router.get(
  '/:monitorId',
  passport.authenticate('jwt', { session: false }),
  MonitorController.getOne
)
router.post(
  '/:monitorId',
  passport.authenticate('jwt', { session: false }),
  MonitorController.update
) // Update monitors
router.delete(
  '/:monitorId',
  passport.authenticate('jwt', { session: false }),
  MonitorController.delete
) // Delete monitors

router.get(
  '/:monitorId/events',
  passport.authenticate('jwt', { session: false }),
  EventController.getByMonitor
)
router.get(
  '/:monitorId/heartbeats',
  passport.authenticate('jwt', { session: false }),
  HeartbeatController.getByMonitor
)
module.exports = router
