'use strict'
class Bonus {
    constructor(type,salary){
        console.log('Context Class created!');
        this.salary = salary;
        switch(type){
            case 'S':
                this.strategy = new performanceS(4);
                break;
            case 'A':
                this.strategy = new performanceA(3);
                break;
            case 'B':
                this.strategy = new performanceB(2);
                break;
            default:
                this.strategy = new performanceS(4);
        }

    }

    calcInterface(){
        console.log("context.calcInterface invokeed")
        this.strategy.calc(this.salary);
    }
}

class Strategy {
    constructor(){
        console.log('Strategy Class created');
    }

    calc(){
        console.log('strategy.calc invoked!');
    }
}

class performanceS extends Strategy {
    constructor(level){
        super();
        this.level = level;
        console.log('performanceS class created')
    }

    calc(salary){
        console.log(`performanceS.calc  ${this.level} invoked money is ${salary * this.level}`);
    }
}

class performanceA extends Strategy {
    constructor(level){
        super();
        this.level = level;
        console.log('performanceA class created')
    }

    calc(salary){
        console.log(`performanceA.calc  ${this.level} invoked money is ${salary * this.level}`);
    }
}

class performanceB extends Strategy {
    constructor(level){
        super();
        this.level = level;
        console.log('performanceB class created')
    }

    calc(salary){
        console.log(`performanceB.calc ${this.level} invoked money is ${salary * this.level}`);
    }
}

let bonus = new Bonus('S',4000)
bonus.calcInterface()
let bonusA = new Bonus('A',4000)
bonusA.calcInterface()
let bonusB = new Bonus('B',4000)
bonusB.calcInterface()