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


/**
 *    使用方法
 */
var builder = new carBuilder();
var director1 = new director();
director1.action(builder);
var Car = builder.getCar();
console.log(Car);