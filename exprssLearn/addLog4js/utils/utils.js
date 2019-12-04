/**
 * Created by zwp on 2015/10/7.
 */

var utils = module.exports;

/**
 * Check and invoke callback function
 */
utils.invokeCallback = function (cb) {
    if (!!cb && typeof cb === 'function') {
        cb.apply(null, Array.prototype.slice.call(arguments, 1));
    }
};

/**
 * check [object, Object] Defined
 */
utils.checkDefined = function () {
    var args = Array.prototype.slice.call(arguments);
    for (var i = 0, l = args.length; i < l; i++) {
        if (typeof args[i] === "undefined")
            return false;
    }
    return true;
};

/**
 * check Array
 */
utils.checkArray = function (objArr) {
    return (Object.prototype.toString.call(objArr) === '[object Array]');
};

/**
 * check Object
 */
utils.checkObject = function (objObj) {
    return (Object.prototype.toString.call(objObj) === '[object Object]');
};

/**
 * is valid number
 * NaN or -Infinity or Infinity cannot calc in server
 */
utils.checkValidNumber = function (data) {
    return !(typeof data !== 'number'
        || Number.isNaN(data)
        || Number.NEGATIVE_INFINITY === data
        || Number.POSITIVE_INFINITY === data);
};

/**
 * is valid integer
 * NaN or -Infinity or Infinity cannot calc in server
 */
utils.checkValidInteger = function (data) {
    if (typeof data !== 'number'
        || Number.isNaN(data)
        || Number.NEGATIVE_INFINITY === data
        || Number.POSITIVE_INFINITY === data) {
        return false;
    }

    return (data % 1 === 0);
};

/**
 * json parse
 * @param {binaryData} binary data
 */
utils.jsonParse = function (str) {
    try {
        var jsonData = JSON.parse(str);
        return jsonData;
    } catch (err) {
        logger.error("json parse %j error:%j, stack:%j", str, err.message, err.stack);
        return null;
    }
};