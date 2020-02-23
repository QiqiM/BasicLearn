const o = { name: 'zhangsan', age: 24 };
const oFun = function() {
    this.name = "lisi";
    this.age = 23;
}

console.log(o);