var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.set('Content-Type', 'text/html');
  res.sendFile('/home/node/app/public/test.html');
});

module.exports = router;
