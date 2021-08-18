var router = require('express').Router();

router.get('/', function (req, res, next) {
    res.json({status:'OK'}).status(200)
})
router.use('/users', require('./users'));
router.use('/monitors', require('./monitors'));
router.use('/notifications', require('./notifications'));
router.use('/auth', require('./auth'));


module.exports = router;