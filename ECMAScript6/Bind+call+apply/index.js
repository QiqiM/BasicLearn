Function.prototype.bindFn = function bind(thisArg) {
    if (typeof this !== 'function') {
        throw new TypeError(this + 'must be a function');
    }
    // 存储函数本身
    var self = this;
    // 去除thisArg的其他参数 转成数组
    var args = [].slice.call(arguments, 1);
    console.log("args: %j", args);
    var bound = function() {
        // bind返回的函数 的参数转成数组
        var boundArgs = [].slice.call(arguments);
        console.log("boundArgs:%j", boundArgs)
            // apply修改this指向，把两个函数的参数合并传给self函数，并执行self函数，返回执行结果
        console.log("--------: %j", args.concat(boundArgs))
        return self.apply(thisArg, args.concat(boundArgs));
    }
    return bound;
}

// 测试
var obj = {
    name: '若川',
};

function original(a, b) {
    console.log(this.name);
    console.log([a, b]);
}
var bound = original.bindFn(obj, 1);
bound(2); // '若川', [1, 2]