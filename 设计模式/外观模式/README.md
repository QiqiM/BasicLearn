#### 外观模式的定义

> 要求一个子系统的外部与其内部的通信必须通过一个统一的对象进行。外观模式提供一个高层次的接口，使得子系统更易于使用。（简而言之就是提供一个统一的接口，用来 访问子系统的一群接口，从而让子系统更加容易使用）

#### 使用场合

-   为一个复杂的模块或子系统提供一个外界访问的接口
-   子系统相对独立，外界对子系统的访问只要黑箱操作即可
-   维护一个大型遗留系统的时候，如果这个系统已经非常难以维护和扩展，此时可以考虑为新系统开发一个 Facade 类，来提供遗留系统的比较清晰简单的接口，让新系统与 Facede 类交互，提高复用性
-   当系统需要分层设计时，可以考虑使用 Facade 模式

#### 优缺点

> 优点： 使复杂子系统的接口变的简单可用，减少了客户端对子系统的以来，达到解耦的效果；让子系统内部的模块更易维护和扩展；遵循迪米特法则，对内封装具体细节，对外只暴露必要的接口

> 缺点：不符合开闭原则，如果要修改某一个子系统的功能，通常外观类也要一起修改

#### 代码实现

```js
class subSystemA {
    doSonmeThing() {
        console.log("sub system A operation");
    }
}

class subSystemB {
    doSonmeThing() {
        console.log("sub system B operation");
    }
}

class Facade {
    constructor() {
        this.subSystemA = new subSystemA();
        this.subSystemB = new subSystemB();
    }

    doSonmeThing() {
        this.subSystemA.doSonmeThing();
        this.subSystemB.doSonmeThing();
    }
}

function main() {
    let facade = new Facade();
    facade.doSonmeThing();
}

main();
// sub system A operation
// sub system B operation
```
