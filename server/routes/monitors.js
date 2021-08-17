var express = require('express');
var router = express.Router();
let MonitorController = require('../controllers/monitor');
var passport = require('passport');

// Handle Monitors
router.post('/', passport.authenticate('jwt', { session: false}), MonitorController.create); // Create users (Register)
router.get('/', passport.authenticate('jwt', { session: false}), MonitorController.getAll); // Read or get users
router.get('/:monitorId', passport.authenticate('jwt', { session: false}), MonitorController.getOne);
router.post('/:monitorId', passport.authenticate('jwt', { session: false}), MonitorController.update); // Update users
router.delete('/:monitorId', passport.authenticate('jwt', { session: false}), MonitorController.delete); // Delete users

module.exports = router;
