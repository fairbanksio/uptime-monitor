var express = require('express')
var router = express.Router()
var passport = require('passport')
let UserController = require('../../controllers/user')

// Handle Users
router.post('/', UserController.create) // Create users (Register)
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  UserController.getAll
) // Read or get users
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  UserController.getCurrentUser
)
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  UserController.getOne
)
router.post(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  UserController.update
) // Update users
router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  UserController.delete
) // Delete users

module.exports = router
