var express = require('express');
var router = express.Router();
const gmLog = require("../utils/logger")("gm")
const fs = require('fs')
const path = require('path')
console.log(path.resolve(__dirname ,'../dist/index.html'))
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
  gmLog.info("test req")
});

router.get('/test', async function (req, res, next) {
  const sleep = ms => new Promise(resolve => {
    setTimeout(()=>{
      res.sendFile(path.resolve(__dirname ,'../dist/index.html'))
      resolve()
    }, ms)
  });

  await sleep(3000)

  gmLog.info("test Html")
});

module.exports = router;
