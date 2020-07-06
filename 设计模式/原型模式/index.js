// var vehiclePrototype = {

//     init: function ( carModel ) {
//       this.model = carModel;
//     },
  
//     getModel: function () {
//       console.log( "The model of this vehicle is.." + this.model);
//     }
//   };
  
//   function vehicle( model ) {
  
//     function F() {};
//     F.prototype = vehiclePrototype;
  
//     var f = new F();
  
//     f.init( model );
//     return f;
  
//   }
  
//   var car = vehicle( "Ford Escort" );
//   car.getModel();

// var myCar = {

//     name: "Ford Escort",
  
//     drive: function () {
//       console.log( "Weeee. I'm driving!" );
//     },
  
//     panic: function () {
//       console.log( "Wait. How do you stop this thing?" );
//     }
  
//   };
  
//   // Use Object.create to instantiate a new car
//   var yourCar = Object.create( myCar );
  
//   // Now we can see that one is a prototype of the other
//   console.log( yourCar.name );

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
  student.sayHello()

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
  car.getModel();
