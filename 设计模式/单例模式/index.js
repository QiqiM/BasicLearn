var Singleton1 = /** @class */ (function () {
    // 1. 构造器私有化，外部不能new
    function Singleton1() {
    }
    // 3. 提供一个公有的静态方法，返回实例对象
    Singleton1.getInstance = function () {
        return this.instance;
    };
    // 2. 本类内部创建对象实例化
    Singleton1.instance = new Singleton1();
    return Singleton1;
}());
console.log(Singleton1.getInstance(), '11111');
// 懒汉式
var Singleton2 = /** @class */ (function () {
    function Singleton2() {
    }
    Singleton2.getInstance = function () {
        if (this.instance === null) {
            this.instance = new Singleton2();
        }
        return this.instance;
    };
    Singleton2.instance = null;
    return Singleton2;
}());
console.log(Singleton2.getInstance(), '2222');
