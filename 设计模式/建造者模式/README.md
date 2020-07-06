#### 建造者模式

##### 1.建造者模式的定义
> 建造者模式（bulider pattern）比较简单，将一个复杂的对象分解成多个简单的对象来进行构建，将复杂的构建层与表示层分离，使得相同的构建过程可以创建不同的表示的模式。


> 优点：封装性很好，对象的构建与表示分离；建造者模式很容易扩展，如果有新的需求，通过实现一个新的建造者类就可可以完成

> 缺点：使用范围受限，产品内部变化复杂会导致具体建造者过多

#### 实现
> 建造者模式主要有4个部分：product产品类、Builder建造者类、Director指挥者类、客户。

> 主要的流程是：

+ 客户提出需求。
+ 指挥者根据用户需求，指挥建造者去完成需求的各个部分。
+ 建造者完成相应的部分。
+ 我们来看一下相应的代码：
+ 产品类为一辆加工的空壳汽车。

#### 代码实现

```js
/**
 * 产品类：car 目前需要构建一辆车。
 */
class car {
  constructor(){
    this.name = '';
    this.number = '';
    this.wheel = '';
    this.engine = '';
  }
}
```

```js
/* 
*    建造者类，里面有专门负责各个部分的工人
*/
class carBuilder {
  nameBuilder() {
    this.name = '很厉害的车'
  }
  numberBuilder() {
    this.number = '88888888'
  }
  wheelBuilder() {
    this.wheel = '高级橡胶做的轮子'
  }
  engineBuilder() {
    this.engine = '很厉害的引擎'
  }
  getCar() {
    var Car = new car()
    Car.name = this.name;
    Car.number = this.number;
    Car.wheel = this.wheel;
    Car.engine = this.engine;
    return Car;
  }
}
```

```js
/**
 *   指挥者类，指挥各个部分的工人工作
 */
class director {
  constructor() {
  }

  action(builder) {
    builder.nameBuilder();
    builder.numberBuilder();
    builder.wheelBuilder();
    builder.engineBuilder();
  }
}

```

```js
/**
 *    使用方法
 */

var builder = new carBuilder();
var director = new director();
director.action(builder);
var Car = builder.getCar();
console.log(Car);
```