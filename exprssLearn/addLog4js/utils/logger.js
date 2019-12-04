/**
 * Created by ytt on 2019/12/3.
 */

const log4js = require('log4js');//加载log4js模块
const log4jsConfig = require("../config/log4js.json")

log4js.configure(log4jsConfig);

module.exports = function (name) {
    let logger;

    if(!name){
        logger = log4js.getLogger("gm");
    }else{
        logger = log4js.getLogger(name);
    }
    return logger;
};