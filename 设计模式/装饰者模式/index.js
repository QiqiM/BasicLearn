//原始的飞机类
var Plan = function () {
};

Plan.prototype.fire = function () {
    console.log('发射普通子弹');
};


//装饰类
var MissileDecorator = function (plan) {
    this.plan = plan;
}

MissileDecorator.prototype.fire = function () {
    this.plan.fire();
    console.log('发射导弹!');
};

var plan = new Plan();
plan = new MissileDecorator(plan);
plan.fire();
// 发射普通子弹
// 发射导弹!

var Plan1 = {
    fire: function () {
        console.log('发射普通的子弹');
    }
};

var missileDecorator = function () {
    console.log('发射导弹!');
};

var fire = Plan1.fire;

Plan1.fire = function () {
    fire();
    missileDecorator();
};

Plan1.fire();

// 发射普通子弹
// 发射导弹!

// 修改Function原型
Function.prototype.before = function (beforeFunc) {
    //保存旧函数的引用
    var self = this;
    //返回包含旧函数和新函数的“代理”函数
    return function () {
        //执行新函数,且保证this不被劫持,新函数接受的参数                   
        beforeFunc.apply(this, arguments);
        // 也会被原封不动的传入旧函数,新函数在旧函数之前执行
        return self.apply(this, arguments);
    }
}

Function.prototype.after = function (afterFunc) {
    var self = this;
    return function () {
        var ret = self.apply(this, arguments);
        afterFunc.apply(this, arguments);
        return ret;
    }
}

function funcPro() { console.log('test') }
funcPro = funcPro.before(function () {
    console.log("before");
})

funcPro();


// 不污染原型的做法
var before = function (fn, before) {
    return function () {
        before.apply(this, arguments);
        return fn.apply(this, arguments);
    };
};

function func1() { console.log('1') }
function func2() { console.log('2') }

var a = before(func1, func2);
a();


// function autopilotDecorator(target, key, descriptor) {
//     const method = descriptor.value;
    
//     descriptor.value = () => {
//         method.apply(target);
//         console.log('启动自动驾驶模式');
//     }
    
//     return descriptor;
// }

// class Car {
//     @autopilotDecorator
//     drive() {
//         console.log('乞丐版');
//     }
// }

// let car = new Car();
// car.drive();    //乞丐版；启动自动驾驶模式；

let o = {}; // 创建一个新对象

// 在对象中添加一个属性
Object.defineProperty(o, "name", {
  value : "Dickens",
  writable : true,
  enumerable : true,
  configurable : true
});

// 在对象中添加一个方法
Object.defineProperty(o, "sayHello", {
  value : function() {
        console.log('Hello, my name is: ', this.name)
  },
  writable : true,
  enumerable : true,
  configurable : true
});

o.sayHello()    //Hello, my name is:  Dickens