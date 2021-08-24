var express = require('express')
var router = express.Router()
let AuthController = require('../../controllers/auth')

// Handle Auth
router.post('/register', AuthController.register) //Register user via email/username/pass
router.post('/login', AuthController.login) //Authenticate User/Pass
router.post('/logout', AuthController.logout)

module.exports = router
