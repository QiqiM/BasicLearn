// 传统语言的策略模式 ,使用策略模式来计算奖金  

let performanceS = function(){}

performanceS.prototype.calc = function(salary){
    return salary * 4
}

let performanceA = function(){}

performanceA.prototype.calc = function(salary){
    return salary * 3
}

let performanceB = function(){}

performanceB.prototype.calc = function(salary){
    return salary * 2
}

// 定义奖金类
let Bonus = function(){
    this.salary = null;         // 原始工资
    this.strategy = null;       // 计算奖金的策略
}


Bonus.prototype.setSalary = function(sal){
    this.salary = sal;           // 设置员工的原始工资
}

Bonus.prototype.setStrategy = function(strategy){
    this.strategy = strategy     // 设置对应的策略对象
}

//获取奖金数额
Bonus.prototype.getBonus = function(){
    return this.strategy.calc(this.salary)   // 把计算奖金的操作委托给对应的策略对象
}

let bonus = new Bonus();
bonus.setSalary(10000);
bonus.setStrategy(new performanceS);       // 设置策略对象

console.log(bonus.getBonus());              // 40000

bonus.setStrategy(new performanceA);          
console.log(bonus.getBonus());                // 30000



// js中的策略模式

// 封装的策略方法
let strategies = {
    "S": (sal)=> {return sal * 4},
    "A": (sal)=> {return sal * 3},
    "B": (sal)=> {return sal * 2},
}

// 具体计算方法
let calcBonus = function(level,salary){
    return strategies[level](salary);
}

console.log(calcBonus('S',1000))    // 4000
console.log(calcBonus('A',4000))    // 12000
