let invokeCallback = function (cb) {
    if (!!cb && typeof cb === 'function') {
        cb.apply(null, Array.prototype.slice.call(arguments, 1));
    } else {
        //logger.error('invokeCallback invalid cb!!! stack:%j', (new Error()).stack);
    }
};

class carManager {
    // request information
    requestInfo(model, id, cb) {
        invokeCallback(cb, null, { code: 1, info: { model, id } });
    }

    // purchase the car
    buyVehicle(model, id, cb) {
        invokeCallback(cb, null, { code: 1, info: { model, id } });
    }

    // arrange a viewing
    arrangeViewing(model, id, cb) {
        invokeCallback(cb, null, { code: 1, info: { model, id } });
    }

    execute(name) {
        return this[name] && this[name].apply(this, [].slice.call(arguments, 1));
    }
}

// 回调函数版
let cbfun = function (err, res) {
    if (res.code !== 0) {
        console.log(res.info)
    }
}

let car = new carManager();
// 调用命令
car.execute("arrangeViewing", "Ferrari", "14523", cbfun);
car.execute("requestInfo", "Ford Mondeo", "54323", cbfun);
car.execute("requestInfo", "Ford Escort", "34232", cbfun);
car.execute("buyVehicle", "Ford Escort", "34232", cbfun);