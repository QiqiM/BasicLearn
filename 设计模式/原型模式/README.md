#### 原型模式

##### 1.工厂模式的定义
> 原型模式（prototype）是指用原型实例指向创建对象的种类，并且通过拷贝这些原型创建新的对象。


> 优点：简化创建新对象的过程并提高效率，可动态获取对象运行时的状态；原始对象变化
（增加或减少属性和方法），相应克隆对象会跟随着变化

> 缺点：对已有类修改时，需要修改源对象（违反了开放关闭原则）

#### 代码实现

+ js自身实现 Object.create()
```js
var myCar = {

  name: "Ford Escort",

  drive: function () {
    console.log( "Weeee. I'm driving!" );
  },

  panic: function () {
    console.log( "Wait. How do you stop this thing?" );
  }

};

// Use Object.create to instantiate a new car
var yourCar = Object.create( myCar );

// Now we can see that one is a prototype of the other
console.log( yourCar.name );    // Ford Escort
```
> Object.create也允许我们简单的继承先进的概念,比如对象能够直接继承自其它对象,这种不同的继承.我们早先也看到Object.create允许我们使用 供应的第二个参数来初始化对象属性。例如：

```js
var vehicle = {
  getModel: function () {
    console.log( "The model of this vehicle is.." + this.model );
  }
};

var car = Object.create(vehicle, {

  "id": {
    value: MY_GLOBAL.nextId(),
    // writable:false, configurable:false by default
    enumerable: true
  },

  "model": {
    value: "Ford",
    enumerable: true
  }
});
```

+ es6自带的class extends实现
```js
class Person {
    constructor(name) {
      this.name = name
    }
    getName() {
      return this.name
    }
  }
  class Student extends Person {
    constructor(name) {
      super(name)
    }
    sayHello() {
      console.log(`Hello， My name is ${this.name}`)
    }
  }
  
  let student = new Student("xiaoming")
  student.sayHello()   // Hello， My name is xiaoming
```

+ 自定义实现
```js
var vehiclePrototype = {

  init: function ( carModel ) {
    this.model = carModel;
  },

  getModel: function () {
    console.log( "The model of this vehicle is.." + this.model);
  }
};

function vehicle( model ) {

  function F() {};
  F.prototype = vehiclePrototype;

  var f = new F();

  f.init( model );
  return f;

}

var car = vehicle( "Ford Escort" );
car.getModel();  //The model of this vehicle is..Ford Escort
```

