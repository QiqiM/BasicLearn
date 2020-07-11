var each = function (arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        var val = arr[i];
        if (fn.call(val, i, val, arr)) {
            return false;
        }
    }
};
var arr = [1, 2, 3, 4];
each(arr, function (i, v) {
    console.log(v);
    arr[i] = v * 2;
});

// =====================================

class Base {
    constructor(animation) {
        this.animation = animation;
    }

    show() {
        this.animation.show();
    }
}

class MessageDialog extends Base {
    constructor(animation) {
        super(animation);
    }
}

class ErrorDialog extends Base {
    constructor(animation) {
        super(animation);
    }
}

// 效果类
class LineAnimation {
    constructor() {}

    show() {
        console.log("it is liner");
    }
}

class EaseAnimation {
    constructor() {}

    show() {
        console.log("it is ease");
    }
}

let message = new MessageDialog(new LineAnimation());
message.show();
let errorMsg = new ErrorDialog(new EaseAnimation());
errorMsg.show();
