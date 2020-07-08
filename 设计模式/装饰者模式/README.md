#### 装饰者模式

#### 装饰者模式的定义
> 装饰者模式是指动态的将功能附加到对象上。在对象功能扩展上更为方便，是继承一种替代方案

> 优点：装饰类和被装饰类都只关心自身的核心业务，实现了解耦；方便动态的扩展功能，且提供了比继承更多的灵活性

> 缺点：多层装饰比较复杂；常常会引入许多小对象，看起来比较相似，实际上功能大相径庭。使得应用程序架构边得复杂

#### 传统语言的装饰者模式
```js
//模拟传统语言的装饰者

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
```

#### JavaScript中的装饰者模式

> 装饰者模式将一个对象嵌入到另一个对象之中，实际上相当于这个对象被另一个对像包装起来，形成一条包装链。请求随着这条包装链依次传递到所有的对象，每个对象都有处理这条请求的机会。

```js
var Plan1 = {
    fire: function () {
        console.log('发射普通的子弹');
    }
};

var missileDecorator= function () {
    console.log('发射导弹!');
};

var fire = Plan1.fire;

Plan1.fire=function () {
    fire();
    missileDecorator();
};

Plan1.fire();
```

#### 函数功能扩展
> 在JavaScript中，很容易给对象扩展属性与方法但是却不容易给函数扩展额外功能，除非改函数源码但是改写函数违反了开放-封闭原则

```js
var foo = function(){
    console.log(1);
}
//改为
var foo = function(){
    console.log(1);
    console.log(2);//增
}
```

一个常用的方法就是缓存函数引用，改写函数
```js
var foo = function(){
    console.log(1);
}
//改为
var foo = function(){
    console.log(1);
}
var _foo = foo;
foo = function(){
    _foo();
    console.log(2);
}
```
但是这样写还是存在问题要维护额外的中间变量`（_foo）`，如果装饰链过长，中间变量就会越来越多可能会`存在this被劫持问题`,关于this劫持问题，看下面的例子：
```js
var getId = document.getElementById;
document.getElementById = function(ID){
    console.log(1);
    return getId(ID);
}
document.getElementById('demo');
```

因为使用 `document.getElementById` 的时候内部有`this`引用，而这个`this`期望指向的是`document`但是 `getId` 在获取了 `document.getElementById `引用后`this`就指向了`window`，导致抛出错误。
为了让this正确指向document我们可以做出修改:
```js
var getId = document.getElementById;
document.getElementById = function(ID){
    console.log(1);
    return getId.call(document, ID);
}
document.getElementById('demo');
```

#### AOP装饰函数

> AOP（Aspect Oriented Programming） 面向切面编程；把一些和核心业务逻辑无关的功能抽离出来，再通过动态织入的方式掺入业务逻辑模块。

与业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等等好处也很明显，保证了核心业务模块的纯净与高内聚性而且其他的功能模块也可以很好的复用。
首先，我们要实现两个函数一个用来前置装饰，一个用来后置装饰:
+ 直接在Function上做修改，会污染原型
```js
Function.prototype.before = function(beforeFunc){
    //保存旧函数的引用
    var self = this;                     
    //返回包含旧函数和新函数的“代理”函数
    return function(){   
        //执行新函数,且保证this不被劫持,新函数接受的参数                   
        beforeFunc.apply(this, arguments); 
        // 也会被原封不动的传入旧函数,新函数在旧函数之前执行
        return self.apply(this, arguments);  
    }
}

Function.prototype.after = function(afterFunc){
    var self = this;
    return function(){
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
// before
// test
```

+ 不污染原型的做法
```js
var before=function (fn, before) {
    return function () {
        before.apply(this,arguments);
        return fn.apply(this,arguments);
    };
};

function func1(){console.log('1')}
function func2() {console.log('2')}

var a=before(func1,func2);

a(); 
// 1
// 2
```

#### es7装饰器实现
```js
function autopilotDecorator(target, key, descriptor) {
    const method = descriptor.value;
    
    descriptor.value = () => {
        method.apply(target);
        console.log('启动自动驾驶模式');
    }
    
    return descriptor;
}

class Car {
    @autopilotDecorator
    drive() {
        console.log('乞丐版');
    }
}

let car = new Car();
car.drive();    
//乞丐版
//启动自动驾驶模式
```
`decorator`的实现依赖于ES5的`Object.defineProperty`方法。`defineProperty`所做的事情是为一个对象增加新的属性，或者更改某个已存在的属性。调用方式是`Object.defineProperty(obj, prop, descriptor)`。

```js
var o = {}; // 创建一个新对象

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
```

#### 装饰者模式和代理模式的区别：

> 代理模式的目的是，当直接访问本体不方便或者不符合需要时，为这个本体提供一个代替者。本体定义了关键功能，而代理提供了或者拒绝对他的访问，或者是在访问本体之前做一些额外的事情。
装饰者模式的作用就是为对象动态的加入某些行为。

