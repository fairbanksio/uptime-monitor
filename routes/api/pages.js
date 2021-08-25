var express = require('express')
var router = express.Router()
let PageController = require('../../controllers/page')
var passport = require('passport')

// Handle Pages
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  PageController.create
) // Create pages
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  PageController.getAll
) // Read or get pages
router.get(
  '/:pageId',
  passport.authenticate('jwt', { session: false }),
  PageController.getOne
)
router.post(
  '/:pageId',
  passport.authenticate('jwt', { session: false }),
  PageController.update
) // Update pages
router.delete(
  '/:pageId',
  passport.authenticate('jwt', { session: false }),
  PageController.delete
) // Delete pages

module.exports = router