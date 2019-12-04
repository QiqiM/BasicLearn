const path = require('path');
const fs = require('fs');

const constPath = module.exports;

constPath.LOG_DIR = path.join(__dirname,'../logs')

fs.existsSync(constPath.LOG_DIR) || fs.mkdirSync(constPath.LOG_DIR);
