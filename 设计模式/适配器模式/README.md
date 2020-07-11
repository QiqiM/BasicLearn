#### 适配器模式

#### 适配器模式的定义
> 将一个类的接口变换为客户端所期待的另一种接口，从而使原本因为接口不匹配而无法在一起工作的两个类能够在一起工作

#### 使用场合
+ 整合第三方SDK
+ 封装旧接口
+ 类适配器和对象适配器：接口不符合规范，通过适配后变成符合规范的接口进行使用
+ 接口适配器：适用于一个接口不想使用其所有的方法的情况

#### 优缺点
> 优点： 让两个没关系类可以一起运行；提高类的复用性（源角色在原有系统里还可以使用）

> 缺点： 额外对象的创建，非直接调用，存在一定的开销； 不支持多重继承的语言一次只能适配一个适配者类，而且目标抽象类只能为接口，有一定的局限性；被适配者类的方法在Adapter中都会暴露出来

#### 名词解释
+ Target: 目标角色，定义把其他类转换为何种接口
+ Adaptee: 被适配者，就是源角色
+ Adapter: 适配器，负责将Adaptee的接口转换为Target的接口

#### 代码实现

```js
// 目标对象,接口或者抽象类 , 定义客户端调用的统一接口，
// 适配器中需要实现抽象方法
class Target {
    constructor() {
        if (new.target === User) {
            throw new Error('抽象类不能实例化!')
          }
    }

    request() {
    
    }
}

// 被适配者
class Adaptee {
    constructor() {}

    specificRequest() {
        console.log("Adaptee request !");
    }
}

// 继承并实现接口的 request方法  （implements Target）
// TS 才有implements，暂时直接在适配器中实现目标类的方法
class Adapter extends Adaptee {
    constructor() {
        super();
    }

    request() {
        super.specificRequest();
    }
}

const target = new Adapter();
target.request();   // Adaptee request !
```




