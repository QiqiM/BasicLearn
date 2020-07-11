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
