var express = require('express')
var router = express.Router()
let AuthController = require('../../controllers/auth')
var passport = require('passport');

// Handle Auth
router.post('/register', AuthController.register) //Register user via email/username/pass
router.post('/login', AuthController.login) //Authenticate User/Pass
router.post('/logout', AuthController.logout)
router.post('/google', passport.authenticate('google-token', { session: false}), AuthController.loginGoogle); //Authenticate Google Token/oAuth2

module.exports = router
