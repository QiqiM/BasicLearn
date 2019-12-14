'use strict';

class Subject {
    constructor() {
        this.name = "Subject";
        console.log('Subject Class created');
    }

    request() {
        console.log('Subject.request invoked');
    }
}

class RealSubject extends Subject {
    constructor() {
        super()
        this.name = "RealSubject";
        console.log('RealSubject Class created');
    }

    request() {
        console.log('RealSubject.request invoked');
    }
}

class Proxy extends Subject {
    constructor() {
        super()
        this.name = "Proxy";
        this.realSubject = new RealSubject();
        console.log('Proxy Class created');
    }

    request() {
        this.realSubject.request();
    }
}

var proxy = new Proxy()  //  Subject --> Proxy --> Subject--> RealSubject
// proxy.request()

module.exports = proxy;