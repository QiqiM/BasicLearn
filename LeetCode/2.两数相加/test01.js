let LinkList = require('./index')
let assert = require('assert')

let list1 = new LinkList()
list1.insert(2, 'head')
list1.insert(4, 2)
list1.insert(3, 4)
list1.display()

let list2 = new LinkList()
list2.insert(5, 'head')
list2.insert(6, 5)
list2.insert(4, 6)
list2.display()

describe('#addTwo', function () {
    it('res should be [7,0,8]', function () {
        let res = LinkList.addTwoNumbers(list1, list2)
        console.log(res)
        assert.equal(7, res.element)
        assert.equal(0, res.next.element)
        assert.equal(8, res.next.next.element)
    })
})