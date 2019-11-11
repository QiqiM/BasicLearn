//简单工厂类
class AbstractFactory {
    static produce(params) {
        this.factory;
        switch (params.factory) {
            case "NikeFactory":
                this.factory = NikeFactory;
                break;
            case "AdidasFactory":
                this.factory = AdidasFactory;
                break;
            default:
                this.factory = NikeFactory;
        }

        //返回之前，可以做一些逻辑处理
        return this.factory.produce(params);
    }
}
//nike工厂
class NikeFactory {
    static produce(params) {
        this.equipment;
        switch (params.factory) {
            case "NikeTShirts":
                this.equipment = NikeTShirts;
                break;
            case "NikeWinterJacket":
                this.equipment = NikeWinterJacket;
                break;
            default:
                this.equipment = NikeTShirts;
        }

        //返回之前，可以做nike工厂的逻辑处理
        return new this.equipment(params);
    }
}

//adidas工厂
class AdidasFactory {
    static produce(params) {
        this.equipment;
        switch (params.factory) {
            case "AdidasShoes":
                this.equipment = AdidasShoes;
                break;
            case "AdidasCap":
                this.equipment = AdidasCap;
                break;
            default:
                this.equipment = AdidasCap;
        }

        //返回之前，可以做adidas工厂的逻辑处理
        return new this.equipment(params);
    }
}

//着装
class Clothing {
    constructor(params) {
        this.factory = params.factory;
        this.type = params.type;
        this.size = params.size;
        this.price = params.price;
    }
    publish() {
        console.log('publish: ' + this.factory + ',' + this.type + ',size ' + this.size + ',price ' + this.price);
    }
}

//nike T 恤
class NikeTShirts extends Clothing {
}
//nike 冲锋衣
class NikeWinterJacket extends Clothing {
}
//adidas 鞋
class AdidasShoes extends Clothing {
}
//adidas 帽子
class AdidasCap extends Clothing {
}


// test
let nikeWinterJacket = AbstractFactory.produce({
    factory: 'NikeFactory',
    type: 'NikeWinterJacket',
    size: 'L',
    color: 'blue',
    price: 800,
});
//true
console.log(nikeWinterJacket instanceof NikeWinterJacket);
//publish: NikeFactory,NikeWinterJacket,size L,price 800
nikeWinterJacket.publish();