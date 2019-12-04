var express = require('express');
var router = express.Router();
const gmLog = require("../utils/logger")("gm")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  gmLog.info("test req")
});

module.exports = router;
