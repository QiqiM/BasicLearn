#### 单例模式模式

##### 1.工厂模式的定义
> 单例模式：限制类实例化次数只能一次，一个类只有一个实例，并提供一个访问它的全局访问点。

#### 模式特点
+ 类只有一个实例
+ 全局可访问该实例
+ 自行实例化（主动实例化）
+ 可推迟初始化，即延迟执行（与静态类/对象的区别）

#### 适用场景
> “单例模式的特点，意图解决：维护一个全局实例对象。”

+ 引用第三方库（多次引用只会使用一个库引用，如 jQuery）
+ 弹窗（登录框，信息提升框）
+ 购物车 (一个用户只有一个购物车)
+ 全局态管理 store (Vuex / Redux)

项目中引入第三方库时，重复多次加载库文件时，全局只会实例化一个库对象，如 `jQuery`，`lodash`，`moment ...`, 其实它们的实现理念也是单例模式应用的一种：
```js
// 引入代码库 libs(库别名）
import libName from 'lib'

if (window.libs != null) {
  return window.libs;    // 直接返回
} else {
  window.libs = libName   // 初始化
}
```

> 优点：适用于单一对象，只生成一个对象实例，避免频繁创建和销毁实例，减少内存占用。


> 缺点：不适用动态扩展对象，或需创建多个相似对象的场景

#### 代码实现

+ 使用闭包实现
```js
var singleton = function( fn ){
    var result;
    return function(){
        return result || ( result = fn .apply( this, arguments ) );
    }
}
 
var createMask = singleton( function(){
    return document.body.appendChild( document.createElement('div') );
 })
```

+ TS实现
```js
// 饿汉式
class Singleton1 {
    // 1. 构造器私有化，外部不能new
    private constructor(){}

    // 2. 本类内部创建对象实例化
    private static instance : Singleton1 = new Singleton1();

    // 3. 提供一个公有的静态方法，返回实例对象
    public static getInstance() : Singleton1 {
        return this.instance;
    }
}

console.log(Singleton1.getInstance(), '11111');

// 懒汉式
class Singleton2 {
    private constructor(){}

    private static instance: Singleton2 = null;

    public static getInstance() : Singleton2 {
        if (this.instance === null) {
            this.instance = new Singleton2();
        }

        return this.instance;
    }
}

console.log(Singleton2.getInstance(), '2222')
```
