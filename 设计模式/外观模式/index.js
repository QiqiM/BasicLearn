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
    constructor(){
        this.subSystemA = new subSystemA()
        this.subSystemB = new subSystemB()
    }

    doSonmeThing(){
        this.subSystemA.doSonmeThing()
        this.subSystemB.doSonmeThing()
    }
}

function main(){
    let facade = new Facade()
    facade.doSonmeThing()
}

main()  
// sub system A operation
// sub system B operation