var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({message: "i am alive"}).status(200);
});

module.exports = router;
