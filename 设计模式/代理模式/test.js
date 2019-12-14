let proxy = require('./index')
let assert = require('assert')

proxy.request();

describe("#Proxy test",()=>{
    it('realSubject name should be RealSubject',()=>{
        assert.equal(proxy.realSubject.name,"RealSubject");
    })
})